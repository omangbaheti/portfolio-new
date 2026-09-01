---
lead: 'Teth.AR lets a trainer in VR demonstrate assembly steps inside a trainee’s passthrough mixed-reality workspace, in real time, with both users manipulating the same synchronized objects. 1st place at Hack-Attack 3.0.'
---

<div class="embed">
	<iframe src="https://www.youtube.com/embed/RqbDehOqA6Q?si=AznrlXkNavk3KW_D" title="Teth.AR demo" allowfullscreen></iframe>
</div>

**Hackathon:** 🏆 1st Place — [Hack-Attack 3.0](https://hack-attack-3-0.devpost.com/)
**Team:** Omang Baheti, Rishav Banerjee, Satabdi Das, Parinda Rahman
**Theme:** Bettering Businesses
**Project Link:** [Github](https://github.com/ThatAmuzak/Teth.AR)

## The Problem

Remote guidance for physical tasks relies heavily on verbal descriptions of spatial relationships. Instructions such as "move slightly left" or "attach behind the panel" are inherently ambiguous without a shared frame of reference.

At the same time, skill acquisition in these domains depends on motor learning — repetition of precise physical actions observed in context. Video calls fail to replicate this effectively because they separate instruction from the trainee's physical workspace.

## Solution

Teth.AR enables remote training within a synchronized mixed reality environment:

- The trainee operates in a passthrough mixed reality workspace, viewing their real environment augmented with digital guidance.
- The trainer joins through a fully virtual environment that mirrors the trainee's workspace.
- Both users interact with the same virtual objects and assembly steps in real time.

This allows trainers to demonstrate actions inside the trainee's field of view, preserving spatial context and improving comprehension.

## Key Features

- Passthrough mixed reality workspace for the trainee
- Virtual reality interface for the trainer
- Synchronized object manipulation during assembly tasks
- Spatial anchors for stable object placement
- Avatar motion representing trainer gestures
- Session recording for replay and review

## Architecture

The overarching system makes use of the Unity game engine to make extended reality experiences. We use the Meta XR SDK for visualizations of user avatars, the implementation of the mixed reality video passthrough, and interactions such as grab and move. This is then integrated with the Photon Fusion networking solution to connect the trainer and the trainee together. We implement a custom framework here to design and construct virtual replica prototypes of real systems, to enable the trainer to illustrate the appropriate motions to the trainee. Finally, Agora is utilized to stream the real-world video passthrough footage from the trainee to the trainer, allowing the trainer to convey spatialized instructions back to the trainee regarding their task.

```
                ┌─────────────────────────────────────────────────────────────┐
                │                     Teth.AR System                          │
                ├─────────────────────────────────────────────────────────────┤
                │                                                             │
                │  ┌──────────────────────┐          ┌──────────────────────┐ │
                │  │   Trainee (Quest 3)  │          │   Trainer (Quest 3)  │ │
                │  │  Passthrough MR      │          │   VR Environment     │ │
                │  │                      │          │                      │ │
                │  │ - Video passthrough  │          │ - Avatar presence    │ │
                │  │ - Digital overlays   │◄────────►│ - Object control     │ │
                │  │ - Real tools/parts   │          │ - Gesture tracking   │ │
                │  └──────────────────────┘          └──────────────────────┘ │
                │           │                                  │              │
                │           └──────────┬───────────────────────┘              │
                │                      │                                      │
                │  ┌───────────────────▼─────────────────────┐                │
                │  │   Networking Layer (Photon Fusion)      │                │
                │  │  - State synchronization                │                │
                │  │  - Object transforms                    │                │
                │  │  - Spatial anchors                      │                │
                │  └─────────────────────────────────────────┘                │
                │           │                         │                       │
                │           ▼                         ▼                       │
                │  ┌──────────────────┐    ┌──────────────────┐               │
                │  │  Video Stream    │    │  Motion Stream   │               │
                │  │  (Agora)         │    │  (Photon Fusion) │               │
                │  │  Trainee → VR    │    │  Trainer ← → T.  │               │
                │  └──────────────────┘    └──────────────────┘               │
                │                                                             │
                └─────────────────────────────────────────────────────────────┘
```

## Impact

Teth.AR demonstrates how mixed reality can bridge the gap between remote communication and physical instruction. By embedding guidance directly into the workspace, it enables:

- Faster skill acquisition
- Reduced ambiguity in instruction
- Scalable remote training across industries

Applicable domains include manufacturing, field service, logistics, and healthcare training — or any environment where learning depends on doing.

### Use Cases

- Equipment maintenance and repair
- Manufacturing assembly procedures
- Warehouse operations training
- Field service instruction
- Healthcare procedure training