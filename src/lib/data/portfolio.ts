/**
 * Portfolio content verified against the owner's public data:
 * https://github.com/razz-21/ai-portfolio-backend/tree/main/data
 * Contact details and portrait: https://razz-dev.com
 * Liceo project URL and framework:
 * https://github.com/ldcu-razz/web-liceo-8888
 * AI stack: https://github.com/razz-21/ai-portfolio-backend
 * Project years are left blank where the source does not provide them.
 */

export const profile = {
	name: 'Ernesto Razo Jr',
	shortName: 'Razz',
	role: 'Software Developer',
	email: 'razz.ernesto@gmail.com',
	location: 'El Salvador City, Philippines',
	github: 'https://github.com/razz-21',
	linkedin: 'https://www.linkedin.com/in/razz-ernesto',
	bio: 'I turn complex ideas into intuitive web experiences. With over six years in software development, I bring thoughtful interfaces, practical architecture, and a curious mind to every build.',
	yearsExperience: '6+',
	portraitUrl: '/images/razz-black.jpg'
};

export const contactChannels = [
	{
		label: 'LinkedIn',
		value: 'linkedin.com/in/razz-ernesto',
		href: profile.linkedin,
		external: true
	},
	{ label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
	{ label: 'Mobile number', value: '+639067978160', href: 'tel:+639067978160', external: false },
	{
		label: 'Instagram',
		value: '@razzern',
		href: 'https://www.instagram.com/razzern',
		external: true
	}
];

type Project = {
	id: string;
	title: string;
	eyebrow: string;
	description: string;
	tags: string[];
	href: string;
	sourceUrl?: string;
	year: string;
	kind: 'pollify' | 'liceo' | 'attendance';
};

export const projects: Project[] = [
	{
		id: 'pollify',
		title: 'Pollify',
		eyebrow: 'Polling & voting platform',
		description:
			'From a simple question to a shared decision. A responsive platform for creating polls, collecting votes, and following results in real time.',
		tags: ['Angular', 'TypeScript', 'Hono', 'MongoDB'],
		href: 'https://web-pollify.razz-dev.com',
		year: '',
		kind: 'pollify'
	},
	{
		id: 'liceo',
		title: 'Liceo 8888',
		eyebrow: 'Student support platform',
		description:
			'A clearer path from concern to resolution. One central place for students to raise issues and university teams to organize, prioritize, and respond.',
		tags: ['Svelte', 'TypeScript', 'API integration'],
		href: 'https://liceo-8888.razz-dev.com',
		sourceUrl: 'https://github.com/ldcu-razz/web-liceo-8888',
		year: '',
		kind: 'liceo'
	},
	{
		id: 'attendance',
		title: 'HSI Attendance',
		eyebrow: 'Android attendance application',
		description:
			'Everyday attendance, thoughtfully simplified. An Android application bringing clock-ins, time logs, and QR-based attendance into one place.',
		tags: ['Kotlin', 'Android', 'QR scanning'],
		href: 'https://play.google.com/store/apps/details?id=com.r.hsiattendance',
		year: '',
		kind: 'attendance'
	}
];

export const experience = [
	{
		company: 'Liceo de Cagayan University',
		role: 'IT Faculty',
		period: 'Jul 2025 — Present',
		description:
			'Teaching practical IT subjects, mentoring students, and coordinating workshops that connect the classroom with software development.'
	},
	{
		company: 'ORQ.ai',
		role: 'Front-End Engineer',
		period: 'Apr 2024 — May 2025',
		description:
			'Built frontend features and workflows, integrated APIs, and supported maintainable architecture through code reviews and unit testing.'
	},
	{
		company: 'Nalagenetics',
		role: 'Software Developer',
		period: 'Aug 2022 — Apr 2024',
		description:
			'Led frontend development and application architecture, with a focus on performance, API integration, and reliable testing practices.'
	},
	{
		company: 'Nathan & Nathan',
		role: 'Web Developer',
		period: 'May 2022 — Jul 2022',
		description:
			'Translated client requirements into application features, UI components, business logic, and backend API integrations.'
	},
	{
		company: 'Muuvment',
		role: 'Front-End Developer',
		period: 'Feb 2020 — 2022',
		description:
			'Built responsive web and mobile applications, connected APIs, and established end-to-end testing workflows.'
	},
	{
		company: 'Hyperstacks Inc.',
		role: 'Front-End Developer',
		period: 'May 2019 — May 2022',
		description:
			'Developed frontend features and application workflows while supporting code quality, scalable architecture, and unit testing.'
	}
];

export const capabilities = [
	{
		title: 'Web development',
		description:
			'Considered interfaces, dependable APIs, and maintainable architecture. Web applications built around the people who use them.',
		skills: ['Svelte', 'Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Hono', 'Playwright']
	},
	{
		title: 'Mobile applications',
		description:
			'Practical Android experiences that put everyday tasks within reach, from the interface through to Google Play deployment.',
		skills: ['Kotlin', 'Android', 'Android Studio', 'API integration']
	},
	{
		title: 'Applied AI',
		description:
			'An ongoing exploration of more useful software: conversational interfaces, semantic search, and answers grounded in real context.',
		skills: ['Python', 'FastAPI', 'LangChain', 'RAG', 'Gemini', 'MongoDB Atlas']
	}
];
