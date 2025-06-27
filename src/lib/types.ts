export interface BreakdownNode {
	label: string;
	count: number;
	miniTimeSeries: number[]; // e.g., counts per time bucket
	children?: BreakdownNode[];
	sql?: string; // optional: SQL or query used to generate this node
}
