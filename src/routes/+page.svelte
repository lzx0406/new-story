<script>
	import { onMount } from 'svelte';
	import ChartPanel from '../components/ChartPanel.svelte';
	import BreakdownTree from '../components/BreakdownTree.svelte';
	import { loadRows } from '../lib/data/loadCSV';
	import { breakdownPlan } from '../lib/breakdownPlan';
	import { buildBreakdownTree } from '../lib/breakdown';

	let posts = [];
	/**
	 * @type {string | any[]}
	 */
	let breakdownTree = [];

	onMount(async () => {
		posts = await loadRows();
		breakdownTree = buildBreakdownTree(posts, breakdownPlan, 'timestamp');
	});
</script>

<div style="margin: 2% 5% 0 5%;">
	<section>
		<h1 style="font-size: 1.5rem;">
			<span style="font-weight:200;">Analysis subject:</span> tariff
		</h1>
	</section>

	<div style="display: flex; flex-direction: row; gap: 20px;">
		<section>
			<ChartPanel />
		</section>

		<section>
			{#if breakdownTree && breakdownTree.length}
				{#each breakdownTree as node}
					<BreakdownTree {node} />
				{/each}
			{:else}
				<p>Loading breakdown tree...</p>
			{/if}
		</section>
	</div>
</div>

<style>
	section {
		margin: 3% 0% 0% 0%;
		font-family: lato, system-ui, sans-serif;
		/* font-size: 1.2rem; */
	}
</style>
