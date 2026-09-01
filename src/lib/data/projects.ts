export type Discipline = 'xr' | 'ux';

export type Project = {
	id: string;
	title: string;
	subtitle: string;
	discipline: Discipline;
	year: string;
	platform: string;
	engine: string;
	tags: string[];
	img: string;
	alt: string;
	desc: string;
	slug: string;
};

export const projects: Project[] = [
	{
		id: '001',
		title: 'VR Autonomous Driving Simulator',
		subtitle: 'Gesture-interface research platform',
		discipline: 'xr',
		year: '2025',
		platform: 'Meta Quest 3 + Direct-Drive Wheel',
		engine: 'Unity · HPUI-Core / UXF',
		tags: ['VR', 'Haptics', 'Procedural Generation', 'Autonomous Agent'],
		img: '/img/projects/autonomous-driving/featured.png',
		alt: 'Procedurally generated road network in the VR driving simulator',
		desc: 'A simulation platform built from the ground up for thesis research on gesture interfaces in vehicles — procedural road networks, direct-drive wheel input, and an autonomous agent, locked at 90fps on a Quest 3.',
		slug: 'autonomous-driving-simulator'
	},
	{
		id: '002',
		title: 'Teth.AR',
		subtitle: 'Synchronized mixed-reality remote training',
		discipline: 'xr',
		year: '2026',
		platform: 'Meta Quest 3 — Passthrough MR / VR',
		engine: 'Unity + Photon Fusion + Agora',
		tags: ['VR/AR', 'Hackathon', 'Mixed Reality', 'Networking'],
		img: '/img/projects/teth-ar/featured.png',
		alt: 'Teth.AR trainer and trainee workspaces side by side',
		desc: '1st place, Hack-Attack 3.0. The trainer works in a fully virtual space while the trainee works in passthrough mixed reality — both manipulating the same virtual objects so assembly instructions live inside the trainee’s field of view.',
		slug: 'teth-ar'
	},
	{
		id: '003',
		title: 'One Finger Warrior',
		subtitle: 'Thumb-to-finger input for smart glasses',
		discipline: 'ux',
		year: '2026',
		platform: 'Meta Quest 3 · Motion-Capture Lab',
		engine: 'Unity + HPUI-Core',
		tags: ['XR', 'Text Entry', 'Gesture Input', 'Optimization', 'User Study'],
		img: '/img/projects/one-finger-warrior/featured.png',
		alt: 'The One Finger Warrior interaction technique on a gloved hand',
		desc: 'A new technique that turns the index finger into a discreet input surface — six zones, 36 gestures. An NSGA-III-optimized keyboard layout reached 12.05 WPM while walking on a treadmill, with no performance loss versus standing.',
		slug: 'one-finger-warrior'
	}
];