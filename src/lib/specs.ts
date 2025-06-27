import type { TopLevelSpec } from 'vega-lite';
import { inferType } from './fieldKind';
import type { ChartConfig } from './stores';

export function toSpec(c: ChartConfig, rows: any[]): TopLevelSpec {
	const enc: any = { x: { field: c.x, type: inferType(c.x) } };
	enc.y =
		c.y === 'count'
			? { aggregate: 'count', type: 'quantitative' }
			: { field: c.y, type: inferType(c.y as string) };
	if (c.color) enc.color = { field: c.color, type: inferType(c.color) };
	if (c.timeUnit && enc.x.type === 'temporal') enc.x.timeUnit = c.timeUnit;
	return {
		data: { values: rows },
		mark: { type: c.chart, tooltip: true, opacity: 0.8 },
		encoding: enc,
		width: 600,
		height: 400
	};
}
