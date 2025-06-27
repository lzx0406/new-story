<script lang="ts">
	import MiniTimeSeries from './MiniTimeSeries.svelte';
	import type { BreakdownNode } from '../lib/types';
	import BreakdownTree from './BreakdownTree.svelte';

	export let node: BreakdownNode;
	export let level: number = 0;
	export let maxCount: number = 0;

	// Color logic for both bar and time series
	$: color = level === 0 ? '#888' : level === 1 ? '#1976d2' : '#d32f2f';
</script>

{#if node}
	<div style="margin-left: {level * 16}px; display: flex; align-items: center;">
		<span class="node-label">{node.label}</span>
		<span class="node-count">{node.count}</span>
		<div class="count-bar-container">
			<div
				class="count-bar"
				style="width: {maxCount ? (node.count / maxCount) * 80 : 80}px; background: {color};"
			></div>
		</div>
		<MiniTimeSeries data={node.miniTimeSeries} {color} />
	</div>
	{#if node.children}
		{#each node.children as child}
			<BreakdownTree
				node={child}
				level={level + 1}
				maxCount={Math.max(...node.children.map((c) => c.count))}
			/>
		{/each}
	{/if}
	<!-- <pre>{JSON.stringify(node.miniTimeSeries)}</pre> -->
{/if}

<style>
	.node-label {
		margin-bottom: 1rem;
		min-width: 180px;
	}
	.node-count {
		margin-bottom: 1rem;
		min-width: 60px;
	}
	.count-bar-container {
		height: 12px;
		width: 80px;
		background: #eee;
		margin: 0 8px;
		border-radius: 6px;
		overflow: hidden;
	}
	.count-bar {
		height: 100%;
		transition: width 0.2s;
	}
</style>
