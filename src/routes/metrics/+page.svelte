<script>
    import MetricCard from "$lib/components/MetricCard.svelte";
    export let data;
</script>

<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Deine Metrics</h1>
        <a href="/metrics/create" class="btn btn-success"
            >+ Neue Metric erstellen</a
        >
    </div>

    {#if data.metrics && data.metrics.length > 0}
        <div class="metrics-grid">
            {#each data.metrics as metric}
                <MetricCard {metric} />
            {/each}
        </div>
    {:else}
        <p>Keine Metrics gefunden.</p>
    {/if}
</div>

<style>
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    .container {
        margin-top: 20px;
    }
</style>
