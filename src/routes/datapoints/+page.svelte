<script>
    export let data;
    let selectedMetricId = "";
    let selectedTagId = "";
    let selectedDate = "";

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("de-CH");
    }
</script>

<div class="container mt-4">
    <h1 class="mb-4">Datapoints</h1>

    <div class="row mb-3">
        <div class="col">
            <label for="metricFilter" class="form-label">Metric</label>
            <select
                id="metricFilter"
                bind:value={selectedMetricId}
                class="form-select"
            >
                <option value="">Alle</option>
                {#each data.metrics as metric}
                    <option value={metric._id}>{metric.title}</option>
                {/each}
            </select>
        </div>
        <div class="col">
            <label for="tagFilter" class="form-label">Tag</label>
            <select
                id="tagFilter"
                bind:value={selectedTagId}
                class="form-select"
            >
                <option value="">Alle</option>
                {#each data.availableTags as tag}
                    <option value={tag._id}>{tag.name}</option>
                {/each}
            </select>
        </div>
        <div class="col">
            <label for="dateFilter" class="form-label">Datum</label>
            <select
                id="dateFilter"
                bind:value={selectedDate}
                class="form-select"
            >
                <option value="">Alle</option>
                {#each data.availableDates as date}
                    <option value={date}>{formatDate(date)}</option>
                {/each}
            </select>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Datum</th>
                <th>Wert</th>
                <th>Metric</th>
                <th>Tags</th>
                <th>Aktionen</th>
            </tr>
        </thead>
        <tbody>
            {#each data.datapoints.filter((dp) => {
                const metric = data.metrics.find((m) => m._id == dp.metricId);
                const matchesMetric = !selectedMetricId || dp.metricId == selectedMetricId;
                const matchesTag = !selectedTagId || (metric && metric.tagIds?.includes(parseInt(selectedTagId)));
                const matchesDate = !selectedDate || dp.date === selectedDate;
                return matchesMetric && matchesTag && matchesDate;
            }) as dp}
                <tr>
                    <td>{formatDate(dp.date)}</td>
                    <td>
                        {#each data.metrics.filter((m) => m._id == dp.metricId) as m}
                            {dp.value} {m.unit}
                        {/each}
                    </td>
                    <td>
                        {#each data.metrics.filter((m) => m._id == dp.metricId) as m}
                            {m.title}
                        {/each}
                    </td>
                    <td>
                        {#each data.metrics.filter((m) => m._id == dp.metricId) as m}
                            {#each m.tagNames as tag}
                                <span class="badge bg-secondary me-1"
                                    >{tag}</span
                                >
                            {/each}
                        {/each}
                    </td>
                    <td>
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={dp._id} />
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                class="btn btn-danger btn-sm"
                                title="Löschen"
                            >
                                <i class="bi bi-trash"></i></button
                            >
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
