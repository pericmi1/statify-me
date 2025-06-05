<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    export let data;

    let selectedMetricId = "";
    let chartCanvas;
    let chartInstance;

    let currentMetric = null;

    $: if (selectedMetricId) {
        currentMetric = data.metrics.find((m) => m._id == selectedMetricId);
        if (chartInstance) chartInstance.destroy();
        createChart();
    }

    function createChart() {
        if (!chartCanvas || !currentMetric) return;

        const datapoints = data.datapoints
            .filter((dp) => dp.metricId == selectedMetricId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const labels = datapoints.map((dp) => dp.date);
        const values = datapoints.map((dp) => dp.value);

        chartInstance = new Chart(chartCanvas, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: currentMetric?.title ?? "Wert",
                        data: values,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.2,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            callback: function (val, index) {
                                const rawDate = this.getLabelForValue(val);
                                const d = new Date(rawDate);
                                return `${d.getDate().toString().padStart(2, "0")}.${(
                                    d.getMonth() + 1
                                )
                                    .toString()
                                    .padStart(2, "0")}.${d.getFullYear()}`;
                            },
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: currentMetric?.unit ?? "",
                        },
                    },
                },
            },
        });
    }
</script>

<div class="container mt-4">
    <h1 class="mb-4">Charts</h1>

    <div class="mb-3">
        <label for="metricSelect" class="form-label">Metric auswählen</label>
        <select
            id="metricSelect"
            class="form-select"
            bind:value={selectedMetricId}
        >
            <option value="">-- Bitte wählen --</option>
            {#each data.metrics as metric}
                <option value={metric._id}>{metric.title}</option>
            {/each}
        </select>
    </div>

    {#if selectedMetricId}
        <canvas bind:this={chartCanvas}></canvas>
    {/if}
</div>
