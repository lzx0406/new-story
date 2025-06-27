import type { ChartConfig } from './stores';
import { inferType } from './fieldKind';

export interface TransformPlan {
	where?: string[];
	groupBy?: string[];
	aggregates: { fn: string; field: string; as: string }[];
	timeUnit?: string; // for date bucket if needed later
}

export function derivePlan(c: ChartConfig): TransformPlan {
	const p: TransformPlan = { aggregates: [] };

	// WHERE
	if (c.filter?.trim()) p.where = [c.filter.trim()];

	// GROUP BY: x axis always a grouping key
	p.groupBy = [c.x];
	if (c.color) p.groupBy.push(c.color);

	// AGGREGATES
	if (c.aggregate === 'count') {
		p.aggregates.push({ fn: 'count', field: '*', as: 'count' });
	} else if (c.aggregate !== 'none') {
		p.aggregates.push({ fn: c.aggregate, field: c.y, as: `${c.aggregate}_${c.y}` });
	}

	// For temporal bucket we still group by raw Date; runner can bucket later
	return p;
}
