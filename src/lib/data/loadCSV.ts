import { csvParse } from 'd3-dsv';

let cache: any[] | null = null;

export async function loadRows() {
	if (cache) return cache;

	const text = await fetch('data/posts.csv').then((r) => {
		if (!r.ok) throw new Error(`Failed to load CSV – HTTP ${r.status}`);
		return r.text();
	});

	cache = csvParse(text, (d) => {
		const textStr = (d.text ?? '') as string;
		return {
			...d,
			timestamp: new Date(d.timestamp as string),
			text_len: textStr.length
		};
	});
	return cache;
}
