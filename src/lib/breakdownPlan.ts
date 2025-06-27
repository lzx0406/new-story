// src/lib/breakdownPlan.ts
import type { BreakdownStep } from './breakdown';
const positiveEmotions = [
	'admiration',
	'amusement',
	'approval',
	'gratitude',
	'joy',
	'love',
	'optimism',
	'pride',
	'relief',
	'desire',
	'caring',
	'excitement'
];
const negativeEmotions = [
	'anger',
	'annoyance',
	'disapproval',
	'disgust',
	'embarrassment',
	'fear',
	'grief',
	'nervousness',
	'remorse',
	'sadness'
];
const neutralEmotions = ['confusion', 'realization', 'surprise', 'curiosity', 'neutral'];

export function emotionToCategory(emotion: string): 'positive' | 'negative' | 'neutral' {
	if (positiveEmotions.includes(emotion)) return 'positive';
	if (negativeEmotions.includes(emotion)) return 'negative';
	return 'neutral';
}

export const breakdownPlan: BreakdownStep[] = [
	{
		label: 'all posts',
		children: [
			{
				label: 'pro-ban',
				filter: (row) => row.stance_gpt === 'Pro-ban',
				children: [
					{
						label: 'positive sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'positive'
					},
					{
						label: 'negative sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'negative'
					},
					{
						label: 'neutral sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'neutral'
					}
				]
			},
			{
				label: 'anti-ban',
				filter: (row) => row.stance_gpt === 'Anti-ban',
				children: [
					{
						label: 'positive sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'positive'
					},
					{
						label: 'negative sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'negative'
					},
					{
						label: 'neutral sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'neutral'
					}
				]
			},
			{
				label: 'neutral',
				filter: (row) => row.stance_gpt === 'Neutral',
				children: [
					{
						label: 'positive sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'positive'
					},
					{
						label: 'negative sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'negative'
					},
					{
						label: 'neutral sentiment',
						filter: (row) => emotionToCategory(row.emotion) === 'neutral'
					}
				]
			}
		]
	}
];
