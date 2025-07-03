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
			<div class="breakdown-table">
				<div class="breakdown-header">
					<span class="header-label">Label</span>
					<span class="header-count">Count</span>
					<span class="header-timeseries">Time Series</span>
				</div>
				<div class="breakdown-body">
					{#if breakdownTree && breakdownTree.length}
						{#each breakdownTree as node}
							<BreakdownTree {node} />
						{/each}
					{:else}
						<p>Loading breakdown tree...</p>
					{/if}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	section {
		margin: 3% 0% 0% 0%;
		font-family: lato, system-ui, sans-serif;
		/* font-size: 1.2rem; */
	}
	.breakdown-table {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.breakdown-header,
	.breakdown-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		align-items: center;
		gap: 1rem;
	}
	.breakdown-header {
		font-weight: bold;
		/* font-size: 1.1rem; */
		margin-bottom: 1rem;
		color: #222;
	}
	.breakdown-body {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
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
</style>
