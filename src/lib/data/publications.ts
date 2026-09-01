export type Publication = {
	slug: string;
	title: string;
	authors: string;
	venue: string;
	year: string;
	doi?: string;
	pdf?: string;
	tags: string[];
	img?: string;
};

export const publications: Publication[] = [
	{
		slug: 'one-finger-warrior-paper',
		title: 'One Finger Warrior: Thumb-to-Index Finger Interaction Technique for Mobile Use',
		authors: 'Omang Baheti, Shariff AM Faleel, Rishav Banerjee, Khalad Hasan, Pourang Irani',
		venue: 'ISMAR ’26 — Accepted (IEEE ISMAR / TVCG)',
		year: '2026',
		tags: ['XR', 'Interaction Technique', 'Text Entry'],
		img: '/img/projects/one-finger-warrior/featured.png'
	},
	{
		slug: 'eyes-free-thumb-to-finger',
		title: 'Assessing Performance Characteristics of Eyes-Free Thumb-to-Finger Gestural Text Entry',
		authors: 'Rishav Banerjee, Shariff AM Faleel, Omang Baheti, Khalad Hasan, Pourang Irani',
		venue: 'VRST ’26 — Accepted (ACM VRST)',
		year: '2026',
		tags: ['XR', 'Text Entry', 'Evaluation'],
		img: '/img/projects/one-finger-warrior/featured.png'
	},
	{
		slug: 'thumbswype',
		title: 'ThumbSwype: Thumb-to-Finger Gesture Based Text-Entry for Head Mounted Displays',
		authors: 'Shariff AM Faleel, Rishav Banerjee, Omang Baheti, Khalad Hasan, Pourang Irani',
		venue: 'Mobile HCI ’25 — ACM, Sharm-El-Sheikh, Egypt',
		year: '2025',
		doi: '10.1145/3743708',
		tags: ['XR', 'Text Entry', 'Hand Interactions'],
		img: '/img/publications/thumbswype/featured.png'
	},
	{
		slug: 'whats-the-thumb-doing',
		title:
			"What's the Thumb Doing? — Improving Precision for Thumb-to-Finger Interactions on Hand Proximate User Interfaces",
		authors: 'Shariff AM Faleel, Rishav Banerjee, Omang Baheti, Khalad Hasan, Pourang Irani',
		venue: 'GI ’25 — Graphics Interface, Kelowna, Canada',
		year: '2025',
		pdf: 'https://shariff-faleel.com/pdfs/faleel25_whats_the_thumb_doing.pdf',
		tags: ['XR', 'Hand Interactions', 'HPUI'],
		img: '/img/publications/whats-the-thumb-doing/featured.png'
	}
];