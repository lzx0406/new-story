export const fieldKind: Record<string, 'temporal' | 'nominal' | 'quant'> = {
	timestamp: 'temporal',
	source: 'nominal',
	platform: 'nominal',
	url: 'nominal',
	text: 'nominal',
	type: 'nominal',
	text_len: 'quant' // derived length of the text field
};

export const allFields = Object.keys(fieldKind);

export function inferType(field: string): 'temporal' | 'quantitative' | 'nominal' {
	const k = fieldKind[field] ?? 'nominal';
	if (k === 'temporal') return 'temporal';
	if (k === 'quant') return 'quantitative';
	return 'nominal';
}
