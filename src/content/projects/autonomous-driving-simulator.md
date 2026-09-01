---
lead: 'A custom VR driving simulator built for thesis research on gesture-based interfaces for smart glasses and head-up displays — procedural roads, direct-drive wheel input, and an autonomous driving agent, running at a locked 90fps on a Quest 3.'
---

## Introduction

One component of my master's thesis focused on designing gesture-based interfaces for smart glasses and head-up displays for multitasking.
To support this research, I built a custom driving simulator from the ground up.
The simulator had to be designed to meet several technical and experimental requirements:

- Procedural Road Generation
- Switch from manual driving to self driving
- Compatible with Direct Drive Steering Wheel (e.g Logitech G290)
- Compatibility with a motion capture system for hand tracking (via [HPUI-Core](https://github.com/ovi-lab/HPUI-Core), [Vicon Stream](https://github.com/ovi-lab/vicon-nexus-unity-stream))
- Telemtry Logging (Eg. Steering, Accelerator, Brake inputs) (via [UXF](https://github.com/immersivecognition/unity-experiment-framework))
- Run at 90fps on a Quest 3.

The core simulator was implemented within a two-week development window.

## Procedural Road

The road network was generated procedurally using [Unity Splines](https://docs.unity3d.com/Packages/com.unity.splines@2.0/manual/index.html). Roads were defined as editable splines, allowing arbitrary layouts to be authored while still producing meshes dynamically at runtime or in-editor.

<div class="embed">
	<iframe src="https://www.youtube.com/embed/5TBl3jpr7ak" title="Procedural road generation" allowfullscreen></iframe>
</div>

Each spline was sampled at a configurable resolution to generate road geometry.
At every sample point, the spline's position and forward direction were evaluated, and a perpendicular right vector was computed to extrude the road surface to a specified left and right width.
These offset points were then stitched together into quads, producing a continuous road mesh with correctly ordered triangles and UVs.
UV coordinates were accumulated based on segment length, enabling seamless texture tiling along roads of varying curvature and scale.

<details>
<summary>Core Logic for Procedural Generation</summary>

```cs
private void GetVertices()
{
	p1_vertices = new();
	p2_vertices = new();
	float step = 1f/resolution;
	for (int i = 0; i < splineContainer.Splines.Count; i++)
	{
		List<Vector3> p1Vertices = new();
		List<Vector3> p2Vertices = new();
		float t = 0;
		for (int j = 0; j < resolution; j++)
		{
			t = j * step;
			SampleAlongSplineWidth(i, t, leftWidth, out float3 p1, out float3 p2);
			p1Vertices.Add(p1);
			p2Vertices.Add(p2);
		}
		t = resolution * step;
		SampleAlongSplineWidth(i, resolution, leftWidth, out float3 lastp1, out float3 lastp2);
		p1Vertices.Add(lastp1);
		p2Vertices.Add(lastp2);

		p1_vertices.Add(new()
		{
			points = p1Vertices,
		});
		p2_vertices.Add(new()
		{
			points = p2Vertices,
		});
	}
}

private void SampleAlongSplineWidth(int splineIndex, float step, float width, out float3 p1, out float3 p2)
{
	splineContainer.Evaluate(splineIndex, step, out position, out forward, out upVector);
	//we can use either upVector or Vector3.up
	//Vector3.up ensure road is flat, while upVector builds the road along the bezier curve's local up
	float3 right = Vector3.Cross(forward, Vector3.up).normalized;
	p1 = position + (right * rightWidth);
	p2 = position + (-right * leftWidth);
}


private void BuildMesh()
{
	GetVertices();
	int offset = 0;
	foreach (GameObject roadMesh in roadObjects)
	{
		DestroyImmediate(roadMesh);
	}
	roadObjects.Clear();

	for (int currSplineIndex = 0; currSplineIndex < splineContainer.Splines.Count; currSplineIndex++)
	{
		List<Vector3> verts = new();
		List<int> tris = new();
		float uvOffset = 0;
		List<Vector2> uvs = new();

		for (int currSplinePoint = 1; currSplinePoint <= resolution; currSplinePoint++)
		{
			Vector3 p1 = p1_vertices[currSplineIndex].points[currSplinePoint-1];
			Vector3 p2 = p2_vertices[currSplineIndex].points[currSplinePoint-1];
			Vector3 p3 = p1_vertices[currSplineIndex].points[currSplinePoint];
			Vector3 p4 = p2_vertices[currSplineIndex].points[currSplinePoint];

			int baseIndex = verts.Count;

			int t1 = baseIndex + 0;
			int t2 = baseIndex + 2;
			int t3 = baseIndex + 3;
			int t4 = baseIndex + 1;
			verts.AddRange(new List<Vector3>{p1, p2, p3, p4});
			tris.AddRange(new List<int>{t1, t2, t3, t3, t4, t1});

			float normalizedDistance = Vector3.Distance(p1, p3) / 4f;
			float uvDistance = uvOffset + normalizedDistance;
			uvs.AddRange(new List<Vector2>()
			{
				new(uvOffset, 0),
				new(uvOffset,1),      
				new(uvDistance,0),    
				new(uvDistance,1)     
			});
			uvOffset += normalizedDistance;
		}
		Mesh mesh = new();
		mesh.SetVertices(verts);
		mesh.SetTriangles(tris, 0);
		mesh.SetUVs(0, uvs);
		mesh.RecalculateNormals();
		mesh.RecalculateBounds();

		GameObject splineGO = new($"SplineMesh_{currSplineIndex}");
		splineGO.transform.parent = transform;
		roadObjects.Add(splineGO);  
		MeshFilter mf = splineGO.AddComponent<MeshFilter>();
		MeshRenderer mr = splineGO.AddComponent<MeshRenderer>();
		mf.mesh = mesh;
		mr.material = roadMaterial;
		mr.sharedMaterial.mainTexture.wrapMode = TextureWrapMode.Repeat;
	}

	BuildAllJunctions();
}
```

</details>

![Road junction editor overlay](https://i.imgur.com/TtQKv2d.jpg)

An accompanying editor overlay streamlined junction creation by allowing designers to select spline knots directly in the Scene view and register them as intersection terminals.
This tooling reduced manual setup and ensured consistency between road geometry and intersection meshes.

![Junction terminals in the scene view](https://i.imgur.com/3lTpwrM.png)

## Car Simulator Components

### Vehicle Controller

The vehicle physics were implemented using the [WheelCollider](https://docs.unity3d.com/6000.0/Documentation/Manual/WheelColliderTutorial.html) which provided realistic tire friction and suspension behavior.
The controller was designed to support both rear-wheel and four-wheel drive configurations.

A core requirement of the simulator was the ability to hand over control to an autonomous agent. Steering, acceleration, and braking inputs were processed through a centralized `CarInputManager.cs`, which abstracted input sources and allowed seamless transitions between manual and autonomous control modes. The steering system applied angle constraints to the front wheels while maintaining synchronized left-right steering geometry.

Dynamic engine audio provided speed-dependent feedback to enhance immersion. The audio pitch was interpolated based on current vehicle velocity, ranging from idle (0.5x) to high-speed (2.0x) pitch scaling. This created a convincing engine note that responded naturally to acceleration and deceleration.

### Self Driving

The self-driving system was implemented as a PID-based controller that followed along the procedural road network.
It was responsible for calculating the accelerator, brake and steering inputs and then hook into the `CarInputManager.cs` to provide these inputs.
Roads were represented as ordered spline segments, and the vehicle continuously advanced along these splines using a fixed spatial step, allowing it to navigate arbitrarily long and branching road layouts.

<div class="embed">
	<iframe src="https://www.youtube.com/embed/RvZ3geedSDM" title="Self-driving demo" allowfullscreen></iframe>
</div>

The PID controller provided a straightforward and dependable solution for autonomous steering, making it well suited to rapid prototyping.
However, it required careful manual tuning to balance responsiveness and stability, and the chosen gain values were sensitive to vehicle speed and road curvature.

A further limitation of the PID-based approach was its lack of predictive capability.
Steering corrections were purely reactive, relying only on current and accumulated error.
This could result in oscillations or delayed responses in sharp turns or at higher speeds.
These effects were partially addressed through signal filtering and steering interpolation, though at the cost of additional control latency.

More advanced solutions, such as [Stanley](https://ieeexplore.ieee.org/document/4282788) or reinforcement learning agents would likely offer better performance and robustness.
However, given the tight development schedule, the PID controller served as a driving agent with quick iteration timelines.

## Steering Controls

The simulator supported both manual driving using a force-feedback steering wheel and an autonomous driving mode, with seamless switching between the two.
In manual mode, steering, throttle, and brake inputs were read directly from the steering wheel hardware via [DirectInput](https://github.com/imDanoush/Unity-DirectInput).

When self-driving mode was activated, control authority shifted from the physical steering wheel to a driving agent.
In the self driving mode, the steering wheel transitioned from an input device to a force-feedback output.

<div class="embed">
	<iframe src="https://www.youtube.com/embed/ggG4S9ZZsUI" title="Force-feedback steering in action" allowfullscreen></iframe>
</div>

## Future Roadmap

- Upgrade to [Unity Vehicles](https://docs.unity3d.com/Packages/com.unity.vehicles@0.1/manual/index.html), a more DOTS based approach.
- Modularise the `SelfDrivingAgent` to swap between different driving agents
- Implement a traffic system.