<script lang="ts">
	export let data: number[] = [];
	export let color: string = '#888';
	const width = 100;
	const height = 20;

	$: max = Math.max(...data, 1);
	$: points = data.length
		? data.map((v, i) => [(i / (data.length - 1)) * width, height - (v / max) * height])
		: [];
</script>

<svg {width} {height}>
	{#if points.length}
		<polyline
			fill="none"
			stroke={color}
			stroke-width="2"
			points={points.map(([x, y]) => `${x},${y}`).join(' ')}
		/>
	{/if}
</svg>
