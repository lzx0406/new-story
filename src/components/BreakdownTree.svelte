<script lang="ts">
	import MiniTimeSeries from './MiniTimeSeries.svelte';
	import type { BreakdownNode } from '../lib/types';
	import BreakdownTree from './BreakdownTree.svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

	export let node: BreakdownNode;
	export let level: number = 0;
	export let maxCount: number = 0;

	// Color logic for both bar and time series
	$: color = level === 0 ? '#888' : level === 1 ? '#1976d2' : '#d32f2f';
</script>

{#if node}
	<div class="breakdown-row">
		<span class="node-label" style="margin-left: {level * 16}px;">
			<FontAwesomeIcon
				icon={faArrowTurnDown}
				style="margin-right: 6px; transform: rotate(270deg) scaleX(-1); color: gray;"
			/>
			{node.label}
		</span>
		<span class="node-count">
			<div class="count-bar-container">
				<div
					class="count-bar"
					style="width: {maxCount ? (node.count / maxCount) * 80 : 80}px; background: {color};"
				></div>
			</div>
			{node.count}
		</span>
		<span class="node-timeseries">
			<MiniTimeSeries data={node.miniTimeSeries} {color} />
		</span>
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
	.breakdown-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}
	.node-label {
		display: flex;
		align-items: center;
		min-width: 180px;
	}
	.node-count {
		display: flex;
		align-items: center;
		min-width: 60px;
	}
	.node-timeseries {
		min-width: 80px;
	}
	.count-bar-container {
		height: 12px;
		width: 80px;
		background: #eee;
		margin: 0 4px;
		border-radius: 6px;
		overflow: hidden;
	}
	.count-bar {
		height: 100%;
		transition: width 0.2s;
	}
</style>
