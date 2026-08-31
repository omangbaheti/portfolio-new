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
		title: 'Void Protocol',
		subtitle: 'VR psychological horror',
		discipline: 'xr',
		year: '2024',
		platform: 'Meta Quest 3 / PCVR',
		engine: 'Unreal Engine 5',
		tags: ['VR', '6DOF', 'Spatial Audio', 'Haptics'],
		img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&h=800&fit=crop&auto=format',
		alt: 'Dark atmospheric VR environment',
		desc: 'Single-player horror, 6DOF. Three months of presence research with 42 participants shaped every design decision before an asset was built.',
		slug: 'void-protocol'
	},
	{
		id: '002',
		title: 'XR Onboarding Patterns',
		subtitle: 'Multi-platform research programme',
		discipline: 'ux',
		year: '2024',
		platform: 'Cross-platform',
		engine: 'Mixed Methods',
		tags: ['User Studies', 'Pattern Library', 'Spatial UX'],
		img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=700&fit=crop&auto=format',
		alt: 'Research session',
		desc: '12 weeks, 78 participants, 5 platforms. Public pattern library now adopted by three studios. Presented at CHI 2024.',
		slug: 'xr-onboarding-patterns'
	},
	{
		id: '003',
		title: 'Nexus Arena',
		subtitle: '5v5 competitive multiplayer',
		discipline: 'xr',
		year: '2024',
		platform: 'PC / Console',
		engine: 'Unity 6',
		tags: ['Multiplayer', 'Rollback Netcode', 'Playtesting'],
		img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=600&fit=crop&auto=format',
		alt: 'Arena game',
		desc: 'Custom rollback netcode. Four embedded playtest cohorts drove a full UI redesign between alpha and ship.',
		slug: 'nexus-arena'
	},
	{
		id: '004',
		title: 'Spatial Mental Models',
		subtitle: 'Eye-tracking study — passthrough AR',
		discipline: 'ux',
		year: '2023',
		platform: 'Vision Pro / Quest 3',
		engine: 'Qualitative + Quant',
		tags: ['Eye Tracking', 'Think-Aloud', 'Passthrough AR'],
		img: 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=900&h=700&fit=crop&auto=format',
		alt: 'Mixed reality installation',
		desc: '60 participants. Heatmaps, task-completion analysis, and retrospective interviews across two headset generations.',
		slug: 'spatial-mental-models'
	},
	{
		id: '005',
		title: 'Terrain AR',
		subtitle: 'Geospatial field research tool',
		discipline: 'xr',
		year: '2023',
		platform: 'iOS / Android',
		engine: 'Unity + ARFoundation',
		tags: ['AR', 'LiDAR', 'Geospatial'],
		img: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=900&h=600&fit=crop&auto=format',
		alt: 'AR terrain app',
		desc: 'LiDAR-powered geospatial overlay for field researchers. Validated through contextual inquiry with 18 domain experts.',
		slug: 'terrain-ar'
	}
];