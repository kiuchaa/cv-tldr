import { dateLocale, type Locale } from '../i18n';

export type WorkoutSummary = {
	title: string;
	date: string;
	durationMin: number;
	volumeKg: number;
};

export type TrainingSummary = {
	workouts: WorkoutSummary[];
	total: number | null;
};

type HevySet = {
	weight_kg?: number | null;
	reps?: number | null;
};

type HevyWorkout = {
	title: string;
	start_time: string;
	end_time: string;
	exercises?: { sets?: HevySet[] }[];
};

const HEVY_API_BASE = 'https://api.hevyapp.com';

function formatDate(iso: string, locale: Locale): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleDateString(dateLocale(locale), { month: 'short', day: 'numeric' });
}

function durationMinutes(start: string, end: string): number {
	const startMs = new Date(start).getTime();
	const endMs = new Date(end).getTime();
	if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs < startMs) return 0;
	return Math.round((endMs - startMs) / 60_000);
}

function volumeKg(workout: HevyWorkout): number {
	let total = 0;
	for (const exercise of workout.exercises ?? []) {
		for (const set of exercise.sets ?? []) {
			if (set.weight_kg == null || set.reps == null) continue;
			total += set.weight_kg * set.reps;
		}
	}
	return Math.round(total);
}

function mapWorkout(workout: HevyWorkout, locale: Locale): WorkoutSummary {
	return {
		title: workout.title,
		date: formatDate(workout.start_time, locale),
		durationMin: durationMinutes(workout.start_time, workout.end_time),
		volumeKg: volumeKg(workout),
	};
}

async function hevyGet<T>(path: string, apiKey: string): Promise<T | null> {
	const response = await fetch(new URL(path, HEVY_API_BASE), {
		headers: { 'api-key': apiKey },
	});
	if (!response.ok) {
		console.warn(`[hevy] ${path} failed with status ${response.status}`);
		return null;
	}
	return (await response.json()) as T;
}

export async function getTrainingSummary(locale: Locale = 'en', limit = 2): Promise<TrainingSummary> {
	const empty: TrainingSummary = { workouts: [], total: null };
	const apiKey = import.meta.env.HEVY_API_KEY;
	if (!apiKey) {
		console.warn('[hevy] HEVY_API_KEY missing — skipping training block');
		return empty;
	}

	try {
		const pageSize = Math.min(Math.max(limit, 1), 10);
		const [list, count] = await Promise.all([
			hevyGet<{ workouts?: HevyWorkout[] }>(`/v1/workouts?page=1&pageSize=${pageSize}`, apiKey),
			hevyGet<{ workout_count?: number }>('/v1/workouts/count', apiKey),
		]);
		return {
			workouts: (list?.workouts ?? []).slice(0, limit).map((workout) => mapWorkout(workout, locale)),
			total: count?.workout_count ?? null,
		};
	} catch (error) {
		console.warn('[hevy] request failed:', error);
		return empty;
	}
}
