<script lang="ts">
	import { cfg } from '$lib/stores';
	import { allFields } from '$lib/fieldKind';
	import { loadRows } from '$lib/data/loadCSV';
	import { toSpec } from '$lib/specs';
	import embed from 'vega-embed';
	import { onMount } from 'svelte';

	const chartTypes = [
		{ id: 'point', label: 'Scatter' },
		{ id: 'line', label: 'Line' },
		{ id: 'bar', label: 'Bar' }
	];
	const timeUnits = ['day', 'week', 'month'];

	let data: any[] = [];
	let chartEl: HTMLDivElement;

	onMount(async () => {
		data = await loadRows();
		draw();
	});
	$: $cfg && data.length && draw();

	async function draw() {
		if (!chartEl) return;
		const spec = toSpec($cfg, data);
		await embed(chartEl, spec, { actions: false });
	}
	const save = () => localStorage.setItem('chartCfg', JSON.stringify($cfg));
	const clear = () =>
		cfg.set({ chart: 'point', x: 'timestamp', y: 'text_len', timeUnit: false, color: '' });
</script>

<div id="panel">
	<!-- controls -->
	<div class="controls">
		<label
			>Chart type
			<select bind:value={$cfg.chart}
				>{#each chartTypes as t}<option value={t.id}>{t.label}</option>{/each}</select
			>
		</label>

		<label
			>X field
			<select bind:value={$cfg.x}
				>{#each allFields as f}<option value={f}>{f}</option>{/each}</select
			>
		</label>

		<label
			>Y field
			<select bind:value={$cfg.y}>
				<option value="count">count (*)</option>
				{#each allFields as f}<option value={f}>{f}</option>{/each}
			</select>
		</label>

		<label
			>Color (optional)
			<select bind:value={$cfg.color}>
				<option value="">— none —</option>
				{#each allFields as f}<option value={f}>{f}</option>{/each}
			</select>
		</label>

		{#if $cfg.x === 'timestamp'}
			<label
				>Time granularity
				<select bind:value={$cfg.timeUnit}>
					<option value="">raw</option>
					{#each timeUnits as u}<option value={u}>{u}</option>{/each}
				</select>
			</label>
		{/if}
	</div>

	<!-- chart -->
	<div class="chart-wrapper">
		<div bind:this={chartEl}></div>
	</div>

	<!-- action buttons -->
	<div class="buttons">
		<button on:click={save}>save</button>
		<button on:click={clear}>clear</button>
	</div>
</div>

<style>
	/* -------- container -------- */
	#panel {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 12px;
		/* max-width: 800px; */
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
		align-items: flex-end;
	}
	.controls label {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.controls select {
		padding: 2px 6px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	/* -------- chart + axes -------- */
	.chart-wrapper {
		position: relative;
	}

	/* -------- buttons -------- */
	.buttons {
		display: flex;
		flex-direction: row;
		gap: 4px;
		margin-top: 8px;
		width: 70px;
	}
	button {
		padding: 4px 8px;
		background: #e5e7eb;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
	}
</style>
