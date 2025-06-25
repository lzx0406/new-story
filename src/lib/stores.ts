import { writable } from 'svelte/store';

export type ChartType = 'point' | 'line' | 'bar';

export interface ChartConfig {
	chart: ChartType;
	x: string;
	y: string | 'count';
	color?: string;
}

export const cfg = writable<ChartConfig>({
	chart: 'point',
	x: 'timestamp',
	y: 'text_len',
	color: 'platform'
});
