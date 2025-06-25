<script lang="ts">
	import { cfg } from '$lib/stores';
	import { loadRows } from '$lib/data/loadCSV';
	import { toSpec } from '$lib/specs';
	import embed from 'vega-embed';
	import { onMount } from 'svelte';

	let chartEl: HTMLDivElement;
	let data: any[] = [];

	onMount(async () => {
		data = await loadRows();
		draw();
	});

	$: ($cfg, chartEl && draw());

	async function draw() {
		if (!data.length || !chartEl) return;
		const spec = toSpec($cfg, data);
		await embed(chartEl, spec, { actions: false });
	}
</script>

<div bind:this={chartEl} class="w-full h-96"></div>
