<script lang="ts">
	import ChartConfigurator from '../components/ChartConfigurator.svelte';
	import ChartView from '../components/ChartView.svelte';
</script>

<main class="grid grid-cols-3 gap-4 p-4">
	<section class="col-span-1 bg-gray-50 p-3 rounded shadow">
		<h2 class="font-semibold mb-2">Analysis subject: tariff</h2>
		<ChartConfigurator />
	</section>

	<section class="col-span-2">
		<ChartView />
	</section>
</main>

<style>
	main {
		height: 100dvh;
	}
</style>
