---
lead: 'One Finger Warrior turns the index finger into a discreet, always-available input surface for smart glasses — six zones, thirty-six gestures — with a keyboard layout optimized by NSGA-III on empirical gesture data from 12 participants and validated in a 20-participant treadmill study.'
---

# What if you could type with one finger?

Imagine replying to a message, without pulling out your phone, just a subtle thumb movement across your index finger. That's the core idea behind One Finger Warrior, a new interaction technique I designed for Smart Glasses that turns the index finger into a discreet, always-available input surface.

![One Finger Warrior gesture set](/img/projects/one-finger-warrior/ofw-demo.gif)

## The Problem

AR and VR headsets are increasingly capable, but input remains a bottleneck for mobile use. Mid-air gestures (the kind where you reach out and poke at invisible buttons) are not easy to use while walking, can be tiring over long use and look silly in public.

Thumb-to-finger interactions solve several of these problems at once: they're one-handed, discreet, and work through proprioception, meaning you can use them without looking at your hand.

## The Design

![The six-zone finger layout](https://iili.io/C9uLwx4.png)

One Finger Warrior divides the index finger into six zones — three phalanx segments (distal, intermediate, proximal) across two surfaces (volar/front and radial/top). A tap on any zone, or a swipe between any two zones, produces a distinct action, yielding up to 36 possible inputs from a single finger.

![Zones fanned out for text entry](https://iili.io/C9umre1.png)

For text entry, each zone holds a group of six letters. Touching a zone fans the letters out across the finger, and a tap or swipe selects the target character, but mapped entirely onto the finger surface.

## Implementation

### Hand Tracking

As a prototype for this design concept, we used a motion capture setup to track hand movements. Participants wore a glove fitted with infrared markers, which fed precise hand-tracking data into Unity in real time.

![Glove with infrared markers](https://iili.io/C958se4.png)

### Hand Touch Detection

The interaction surfaces were modeled as deformable meshes using Unity's Skinned Mesh Renderer, automatically scaling to each user's hand size.

![Deformable finger meshes](https://iili.io/C97Xha2.png)

The Hand Proximate User Interfaces (HPUI) framework handled interaction detection, using a raycast-based approach to identify where the thumb contacts the finger surface.

![Touch detection in action](/img/projects/one-finger-warrior/ofw-impl.gif)

## Designing a Keyboard Layout

Because One Finger Warrior is a fundamentally different input technique, QWERTY can't simply be mapped onto it. The gesture space has no rows, no columns, and no physical key positions to anchor familiar letter arrangements to. A new technique needs a layout designed from scratch around how its gestures actually perform.

To do that, we first collected empirical data on all 36 gestures from 12 participants. This per-gesture data became the raw material for optimization rather than designing the layout by intuition.

![Per-gesture data collection](https://iili.io/C9a7ZGI.png)

We then used NSGA-III, a genetic optimization algorithm on the collected data to generate an optimal layout for it. The algorithm optimized three objectives simultaneously. **Time** estimated how long it takes to type two consecutive characters, weighted by English bigram frequencies from Norvig's dataset — so common pairs like "th" or "he" get more weight than rare combinations. **Accuracy** used the same bigram weighting but scored the probability of successfully entering each character pair based on empirical gesture accuracy data. **Comfort** used unigram (single-letter) frequencies weighted against the self-reported comfort ratings participants gave each gesture, so common letters would land on gestures that feel natural to perform.

![Layout optimization evolution](/img/projects/one-finger-warrior/layout-optim.gif)

To prevent any single objective from dominating, each objective was normalized to its min-max range before optimization. The algorithm ran approximately 200 times, each with a population size of 400, producing a 3D Pareto front of around 6,686 candidate layouts.

## Evaluating One Finger Warrior

We then conducted a study with 20 participants which required participants to type on this text entry technique while walking on a treadmill. Words had to be entered correctly before advancing, which kept participants attentive to both speed and accuracy rather than just rushing through.

![Study session on the treadmill](https://iili.io/C9aAV2a.png)

We saw that the layout reached 12.05 WPM on average and there was no performance loss when we compare texting while walking vs standing. Accuracy followed the same pattern, with mobility having no effect on the performance.

## What's Next?

Current limitations include the use of a motion capture lab setup with a treadmill, which doesn't fully replicate natural walking.
The study also simulated expert performance rather than tracking how users learn the system over time.
Future directions include integrating predictive text, exploring other fingers, and supporting double-tap and micro-roll gestures to expand the input vocabulary further.