export type Inline = string | { text: string; href?: string; em?: boolean; accent?: boolean };
export type RichText = Inline[];

export type Experience = {
	company: string;
	role: string;
	start: string;
	end?: string;
	description?: string | RichText;
	highlights?: string[];
};

export type Education = {
	school: string;
	program: string;
	start: string;
	end?: string;
	description?: string | RichText;
	highlights?: string[];
};

export type SkillItem = {
	name: string;
	/** Shown on hover (site) and inline in the PDF list */
	text?: string;
};

export type Book = {
	title: string;
	author: string;
	background: string;
	color: string;
	cover?: string;
	href?: string;
};

export type Cv = {
	name: string;
	title: string;
	location: string;
	headline: RichText[];
	summary: RichText[];
	contact: {
		email: string;
		linkedin: string;
		github: string;
		hevy: string;
		x: string;
		portfolio: string;
	};
	experience: Experience[];
	education: Education[];
	skills: { group: string; items: SkillItem[] }[];
	books: Book[];
	booksHref: string;
	quote: RichText;
};

export type Ui = {
	menu: string;
	close: string;
	intro: string;
	experience: string;
	education: string;
	skills: string;
	bookshelf: string;
	training: string;
	contact: string;
	downloadCv: string;
	moreBooks: string;
	viewOnGithub: string;
	latestTraining: string;
	date: string;
	duration: string;
	volume: string;
	workouts: string;
	present: string;
	email: string;
	langEn: string;
	langNl: string;
};
