export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
	date: string;
	count: number;
	level: ContributionLevel;
};

type ContributionsResponse = {
	contributions?: ContributionDay[];
};

export function githubUsername(profileUrl: string): string | null {
	try {
		const url = new URL(profileUrl);
		if (!/(^|\.)github\.com$/.test(url.hostname)) return null;
		return url.pathname.split('/').filter(Boolean)[0] ?? null;
	} catch {
		return null;
	}
}

export async function getContributionWeeks(
	username: string | null,
	weeks = 36,
): Promise<ContributionDay[][]> {
	if (!username) return [];

	try {
		const response = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
		);
		if (!response.ok) {
			console.warn(`[github] contributions request failed with status ${response.status}`);
			return [];
		}

		const data = (await response.json()) as ContributionsResponse;
		const today = new Date().toISOString().slice(0, 10);
		const days = (data.contributions ?? [])
			.filter((day) => day.date <= today)
			.sort((a, b) => a.date.localeCompare(b.date));

		const grouped: ContributionDay[][] = [];
		for (const day of days) {
			const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
			if (grouped.length === 0 || weekday === 0) grouped.push([]);
			grouped[grouped.length - 1].push(day);
		}

		return grouped.slice(-weeks);
	} catch (error) {
		console.warn('[github] contributions request failed:', error);
		return [];
	}
}
