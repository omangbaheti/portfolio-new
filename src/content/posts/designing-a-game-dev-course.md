---
title: 'Designing a Game Development Course, From Scratch'
date: '2025-11-11'
description: 'How we designed UBC Okanagan''s COSC 416 — a game dev course built around the full lifecycle: design thinking, engineering practice, and a two-week game jam capstone instead of a final exam.'
tags: ['Unity', 'Game Design', 'Game Development']
embed: 'https://www.youtube.com/embed/gMMtUlpcuwo'
---

![Course hero image](/img/posts/game-dev-course/featured.png)

While employed as a Teaching Assistant at UBC, I had an opportunity to help design a game development course ([UBCO COSC 416](https://github.com/UBCO-COSC-416?view_as=public)) from scratch along with [Dr. Iman Jalilvand](https://www.linkedin.com/in/iman-jalilvand) and [Rishav Banerjee](https://www.linkedin.com/in/gamuzak/).

Apart from the lectures, most course contents have been made **open-source** and can be found here: [github.com/UBCO-COSC-416](https://github.com/UBCO-COSC-416).

## Course Goals and Structure

From the outset, our goal was to expose students to the full lifecycle of game development rather than treating design and implementation as separate concerns.

Consistent with this aim, the course design focused on some core concepts essential for game development:

- Game Design Thinking
- Good Development Practices (Eg, Version Control, Coding Practices)
- Some basics of SOLID principles and Design Patterns
- Game Design Document
- Game Feel
- Unity Physics
- UI/UX for Games
- Game Juice and Polish
- Collaboration

We interleaved a Game Design assignment with a Game Development assignment each week. Game Design assignments typically involved watching a video essay on a game design or UX concept, followed by short reflective questions. These assignments were deliberately structured to emphasize originality over AI-generated responses and often included practical components such as playing a short game or designing a UI.

Game Development assignments (referred to as "Studio") were structured as follow-along tutorials covering Unity development concepts. Students initially implemented features using simpler, sometimes non-ideal approaches, or mistakes beginner developers often make. However, each assignment then concluded with an optional refactoring section, giving them hands-on experience of implementing with best coding practices. Moreover, assessment rubrics emphasized maintaining a clean Git history, with bonus marks awarded for independently implementing additional features through self-directed learning.

Moreover, the course replaced a traditional final exam with a two-week game jam. This format encouraged students to synthesize everything they had learned under realistic constraints, working in teams to ideate, prototype, iterate, and ship a playable experience. The game jam served not only as an assessment, but as a capstone learning experience that highlighted experimentation, collaboration, and creative problem-solving.

## Detailed Outline

### Unity Engine Setup — Game Dev · Weeks 1–2

The first week mostly focused on getting the students accustomed to the Unity Engine with [Setting Up Unity](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/UnitySetupGuide.pdf) and creating a [Creating a Project](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/NewProjectGuide.pdf).

From the get go we made sure to include good practices such as version control, with a step-by-step overview of configuring a Unity project using GitHub Desktop. Its GUI, while good enough for basic git operations, reduced barriers of entry for students with less experience with git.

![Unity setup guide](https://iili.io/frDB9UJ.png)
![Unity project configuration](https://iili.io/frDCBIV.png)

### Design 1: Thinking Like a Designer — Game Design · Week 2

This assignment prompts students to deconstruct their favorite game through the MDA (Mechanics, Dynamics, Aesthetics) framework.
Rather than simply writing code, the task reinforces analytical skills: understanding how interactive systems produce fun and meaning for players.
This prepares students to approach subsequent hands-on tasks with design awareness first, not just implementation skill.

### Studio 1: Roll a Ball — Game Dev · Weeks 2–4

"Roll a Ball" is a classic introductory tutorial for most Unity developers, but this course was designed for 3rd/4th year students.
As such, beyond covering the basics, students were introduced to the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) and, toward the end of the tutorial, asked to refactor their code into a more modular structure.
Throughout the guide, students were consistently prompted to commit their changes and maintain a clean version history.
You can find the guide [here](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/RollABall.pdf).

![Roll a Ball](https://iili.io/frDoPqP.png)
![Roll a Ball](https://iili.io/frDzAPI.png)
![Roll a Ball](https://iili.io/frDxS3X.png)

### Design 2: Game Feel — Game Design · Weeks 3–4

One reason platformers remain engaging is that no two feel the same; each introduces its own mechanics, pacing, and challenges.
For this assignment, students began by watching a GMTK video essay on [platformer feel](https://youtu.be/yorTG9at90g?si=679rgqLp_MbfOd2H), which explores how subtle design choices shape the player experience.
They then experimented with [GMTK's platformer toolkit](https://gmtk.itch.io/platformer-toolkit) to gain hands-on experience tweaking movement variables and understanding how these changes affect game feel.
Finally, students were given our platformer build and tasked with recreating a similar feel using the toolkit, and explain the rationale behind each of the chosen parameters.

![Platformer toolkit](https://iili.io/frDlVa4.png)
![Platformer feel tuning](https://iili.io/frDEfyl.png)

### Studio 2: Bowling with Physics — Game Dev · Weeks 4–6

This guide builds on the Roll a Ball tutorial by extending it into a more complex, physics-driven bowling game.
Students implement realistic physics interactions, player and camera controls, prefabs, triggers, and collision layers, while progressively refactoring their code.
Apart from introducing students to more complex physics interaction and Cinemachine, it also emphasized software design practices such as the Observer pattern and event-driven programming.
You can find the guide [here](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/BowlingWithPhysics.pdf).

![Bowling with Physics](https://iili.io/frDMKI2.png)
![Bowling with Physics](https://iili.io/frDthJe.png)
![Bowling with Physics](https://iili.io/frDpQyX.png)
![Bowling with Physics](https://iili.io/frb90zu.png)
![Bowling with Physics](https://iili.io/frDDi37.png)

### Design 3: Game Design Document — Game Design · Weeks 5–7

By this point in the course, students were roughly halfway through and were asked to form their final game jam teams and get familiar with their teammates. To kick off this process, we revealed the theme for the final jam: "Retro Twist."

For the final project, teams were required to choose a classic retro game and add a meaningful mechanical twist (e.g., reimagining Galaga with gravity-flipping mechanics). Students then spent the next two weeks brainstorming, iterating on ideas, and documenting their concept in a Game Design Document, giving them time to align as a team while also allowing TAs to provide feedback and keep their ideas within scope.

### Studio 3: Third Person Platformer — Game Dev · Weeks 6–8

A common problem that beginner devs often stumble into is "tutorial hell," where they struggle to progress beyond step-by-step guides.
Instead of providing a structured tutorial, students were required to synthesize concepts from the Roll-A-Ball and Bowling with Physics assignments to independently design and implement a third-person controller and a simple platformer level around it.
Additional bonus marks were offered for implementing more advanced mechanics such as double-jumping and dashing, encouraging experimentation and deeper engagement with movement systems.
You can find the assignment brief [here](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/ThirdPersonPlatformer.pdf).

![Third person platformer](https://iili.io/frb3iWF.png)

### Design 4: Designing Good HUDs — Game Design · Weeks 7–8

This assignment focuses on UI/UX design, specifically creating a clear and effective HUD.
Students first review videos on game UI design by [GMTK](https://www.youtube.com/watch?v=4Bv45aPMGyI) and [Design Doc](https://www.youtube.com/watch?v=bQ_vDjhBv0g) to understand how strong interfaces convey essential information while minimizing cognitive load.

They then redesign the HUD from the Bowling with Physics project in Studio 2, using an intentionally poor example as a starting point.

The goal is to critically assess information hierarchy, layout, and clarity, and produce a HUD that better supports gameplay and player experience.

### Studio 4: Unity UI — Game Dev · Weeks 7–8

This studio extends the Week 6 platformer assignment by focusing on practical UI implementation in Unity. Using an existing third-person controller as a base, students build a functional HUD that integrates cleanly with gameplay systems rather than existing in isolation.

The guide covers core UI workflows, including project setup, reusable utility scripts, asset import and configuration, and structured canvas organization. Students incrementally improve a basic coin counter with layout groups, masking, and animated transitions.

![Unity UI](https://iili.io/frbBMjp.png)
![Unity UI](https://iili.io/frbxfNj.png)
![Unity UI](https://iili.io/frbI2Tb.png)
![Unity UI](https://iili.io/frbIUtj.png)
![Unity UI](https://iili.io/frbnipj.png)

### Design 5: Game Juice — Game Design · Weeks 8–9

One of the final tools to make a game feel great is "game juice" and the final polish.
For this design exercise, students had to review two talks: [Juice it or Lose it](https://youtu.be/Fy0aCDmgnxg?si=DJzR7oE66hvCaJGR) and [GMTK's Secrets of Game Feel and Juice](https://www.youtube.com/watch?v=216_5nu4aVQ).
Finally students had to choose two games of their choice and analyze the kinds of game juice they implemented and possible rationale for the design choice and how they enhanced the player experience.

<div class="embed">
	<iframe src="https://www.youtube.com/embed/Fy0aCDmgnxg" title="Juice it or Lose it" allowfullscreen></iframe>
</div>

### Studio 5: Polish and Build — Game Dev · Weeks 8–10

This was the final studio before the game jam.
Students were required to work in their game jam teams as a test run for collaborative development under time constraints.
This assignment required each student to pick up our [Brick Breaker Prototype](https://thatamuzak.itch.io/breakout3d) and independently add features to improve the "game juice," which could include UI elements, audio, particles etc.
Alongside feature development, the guide emphasizes git collaboration workflows for Unity projects, including branch strategies, PR merging, and conflict resolution.

The assignment concluded with building and exporting a WebGL version to itch.io, ensuring students were fully prepared for both the technical and collaborative demands of the upcoming game jam.

![Brick breaker polish](https://iili.io/frbVt49.png)
![Brick breaker polish](https://iili.io/frbMpxp.png)

### The Final Boss: Retro Twist Game Jam — Game Dev · Weeks 10–12

[The Jam](https://raw.githubusercontent.com/UBCO-COSC-416/.github/main/profile/Assets/RetroTwistGameJamFullDetails.pdf) was the final assessment of the course and carried 50% of the overall grade, making it a high-stakes milestone for the students. All prior assignments were intentionally structured to build towards this, covering Unity fundamentals, design thinking, teamwork, version control, polish, and publishing a WebGL build.

The game jam served as the ultimate integration challenge. Students were expected to apply everything they had learned to deliver not just a playable prototype, but a polished and enjoyable game, something they could genuinely be proud of, whether to share with friends or showcase on a resume.

## Course Outcome

So how'd the students do?

With a tight two-week deadline, students were allowed to use any available resources, including pre-made assets and AI assistance. Interestingly, most teams chose to create original assets and relied on their own programming skills.

Many projects showcased creative yet achievable design twists that added meaningful depth without over-scoping, such as a Pac-Man variant with a shrinking field of view when points were not collected, or a Tetris with shifting gravity. Overall, the results exceeded our expectations by a wide margin, both in creativity and execution.

## Key Takeaways

- **End-to-end learning works:** Framing the course around the full game development lifecycle helped students understand how design, implementation, polish, and publishing connect, rather than treating them as isolated skills.
- **Design-first thinking paid off:** Repeated emphasis on game feel, UI/UX, and design rationale resulted in games that were not just functional, but genuinely enjoyable to play.
- **Constraints encouraged creativity:** Tight timelines, scoped assignments, and the "Retro Twist" theme pushed students toward simple but clever mechanics instead of overambitious designs.
- **The game jam was an effective capstone:** Replacing a traditional exam with a jam successfully tested synthesis of skills and gave students a tangible project they could proudly showcase beyond the course.

## Improvements

- **Post-mortem reflection:** Adding a short, required post-jam retrospective could help students better articulate what worked, what didn't, and how they would improve their process in future projects.
- **Deeper technical knowledge:** Since this was a special course being run for the first time, we tried to cover only the fundamentals of the engine. Perhaps on a future rendition of the course, instructors could cover more advanced topics, casting a wider net on animation, shaders, procedural mesh generation, etc.
- **Structured playtesting checkpoints:** Formalizing peer playtests at fixed milestones may improve iteration quality and help students catch design or usability issues sooner.