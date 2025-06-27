import type { BreakdownNode } from './types';

export interface BreakdownStep {
	label: string;
	groupBy?: string; // e.g., "political_group"
	filter?: (row: any) => boolean;
	children?: BreakdownStep[];
}

// Helper to extract just the date part (YYYY-MM-DD) from a Date or string
function getDateString(timestamp: Date | string | undefined | null) {
	if (!timestamp) return '';
	if (timestamp instanceof Date && !isNaN(timestamp.getTime())) {
		return timestamp.toISOString().split('T')[0];
	}
	if (typeof timestamp === 'string') {
		// Try to parse as date string
		const d = new Date(timestamp);
		if (!isNaN(d.getTime())) {
			return d.toISOString().split('T')[0];
		}
		// fallback: try to split if it's already a date string
		return timestamp.split('T')[0];
	}
	return '';
}

export function buildBreakdownTree(
	data: any[],
	steps: BreakdownStep[],
	timeField: string
): BreakdownNode[] {
	return steps
		.map((step) => {
			// Filter data if needed
			let filtered = step.filter ? data.filter(step.filter) : data;

			// Group if needed
			let groups: { [key: string]: any[] } = {};
			if (step.groupBy) {
				for (const row of filtered) {
					const key = row[step.groupBy] ?? 'Other';
					if (!groups[key]) groups[key] = [];
					groups[key].push(row);
				}
			} else {
				groups = { [step.label]: filtered };
			}

			// For each group, build node
			return Object.entries(groups).map(([groupLabel, groupRows]) => {
				// Build mini time series (count per day)
				const timeCounts: { [date: string]: number } = {};
				let minDate = null;
				let maxDate = null;
				for (const row of groupRows) {
					const dateStr = getDateString(row[timeField]);
					if (!dateStr) continue; // skip if timestamp is missing or invalid
					timeCounts[dateStr] = (timeCounts[dateStr] || 0) + 1;
					if (!minDate || dateStr < minDate) minDate = dateStr;
					if (!maxDate || dateStr > maxDate) maxDate = dateStr;
				}
				// Fill in zeros for missing dates
				let miniTimeSeries: number[] = [];
				if (minDate && maxDate) {
					let d = new Date(minDate);
					const end = new Date(maxDate);
					while (d <= end) {
						const ds = d.toISOString().split('T')[0];
						miniTimeSeries.push(timeCounts[ds] || 0);
						d.setDate(d.getDate() + 1);
					}
				}

				return {
					label: step.groupBy ? `${step.label}: ${groupLabel}` : step.label,
					count: groupRows.length,
					miniTimeSeries,
					children: step.children
						? buildBreakdownTree(groupRows, step.children, timeField)
						: undefined
					// sql: ... (optional, generate SQL for this node)
				};
			});
		})
		.flat();
}
