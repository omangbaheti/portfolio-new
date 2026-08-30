---
lead: 'Void Protocol is a single-player VR horror built around presence — the project treats every mechanic, light, and sound cue as a research instrument.'
---

## Concept

Development opened with an uncomfortable question: what does it actually take to
convince a body it is somewhere it isn't? Void Protocol answers with **six-doof
locomotion**, hand-tracked interaction, and a reactive audio layer that shifts
with the player's gaze.

> Nothing in this build is decorative. Every element earns its place against a
> research question or it gets cut.

## Presence-driven design

Three months of presence research with **42 participants** shaped the design
before a single asset was shipped. Session data drove three full passes:

1. Locomotion tuning — vignetting and move speed felt through long playtests
2. Audio spatialisation — binaural cues that anchor the room in 3D space
3. Off-screen events — staging scares outside the field of view

## Tech

Built in **Unreal Engine 5**. The haptic layer runs on a custom headset-module
that routes in-world events to motor drivers in real time, so steps, heartbeats,
and UI pulses all print through the hardware.

```ts
// simplified presence pulse from the playtest logger
function presencePulse(state: PlayerState, t: number): Signal {
  return {
    heart: state.stress * 0.85 + Math.sin(t * 2.1) * 0.1,
    rumble: lerp(state.stress, bound(state.velocity), 0.2)
  };
}
```

## Outcomes

The full build shipped on **Meta Quest 3 / PCVR**. Pre-release playtests recorded
an average of **11 involuntary reactions per 20-minute session** — the metric the
project was designed around.
