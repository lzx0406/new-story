<script lang="ts">
	import { allFields } from '$lib/fieldKind';
	import { cfg } from '$lib/stores';
	const chartTypes = ['point', 'line', 'bar'];
</script>

<div class="flex flex-col gap-2 text-sm">
	<label>
		Chart type
		<select bind:value={$cfg.chart} class="border p-1 rounded w-full">
			{#each chartTypes as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
	</label>

	<label>
		X field
		<select bind:value={$cfg.x} class="border p-1 rounded w-full">
			{#each allFields as f}
				<option value={f}>{f}</option>
			{/each}
		</select>
	</label>

	<label>
		Y field
		<select bind:value={$cfg.y} class="border p-1 rounded w-full">
			<option value="count">count (*)</option>
			{#each allFields as f}
				<option value={f}>{f}</option>
			{/each}
		</select>
	</label>

	<label>
		Color (optional)
		<select bind:value={$cfg.color} class="border p-1 rounded w-full">
			<option value="">— none —</option>
			{#each allFields as f}
				<option value={f}>{f}</option>
			{/each}
		</select>
	</label>
</div>
