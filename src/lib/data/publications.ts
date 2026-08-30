export type Publication = {
	slug: string;
	title: string;
	authors: string;
	venue: string;
	year: string;
	doi?: string;
	pdf?: string;
	tags: string[];
};

export const publications: Publication[] = [
	{
		slug: 'reducing-cognitive-load-xr',
		title: 'Reducing Cognitive Load in Room-Scale XR Workspaces',
		authors: 'F. Lastname, A. Coauthor, B. Coauthor',
		venue: 'CHI ’25 — ACM Conference on Human Factors in Computing Systems',
		year: '2025',
		doi: '10.1145/xxxx.xxxx',
		tags: ['XR', 'HCI', 'Study']
	},
	{
		slug: 'dwell-time-ambiguity',
		title: 'Dwell-Time Signatures as an Indicator of Interface Ambiguity',
		authors: 'F. Lastname, C. Coauthor',
		venue: 'ISS ’24 — ACM Interactive Surfaces and Spaces',
		year: '2024',
		doi: '10.1145/xxxx.xxxx',
		tags: ['UX Research', 'Eye Tracking']
	},
	{
		slug: 'local-first-field-tools',
		title: 'Local-First Architectures for Offline Field Research Tools',
		authors: 'F. Lastname',
		venue: 'VL/HCC ’24 — IEEE Symposium on Visual Languages and Human-Centric Computing',
		year: '2024',
		tags: ['Software Engineering']
	}
];
