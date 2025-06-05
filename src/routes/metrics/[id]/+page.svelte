<script>
    export let data;

    let editMode = false;
    let editedTitle = "";
    let editedDescription = "";
    let showCreateRow = false;
    let newDate = "";
    let newValue = "";

    let average = 0;
    let max = 0;
    let min = 0;

    $: if (data.datapoints && data.datapoints.length > 0) {
        const values = data.datapoints.map((dp) => dp.value);
        average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(
            2,
        );
        max = Math.max(...values);
        min = Math.min(...values);
    }

    function toggleEdit() {
        editMode = !editMode;
        if (editMode) {
            editedTitle = data.metric.title;
            editedDescription = data.metric.description;
        }
    }
</script>

<a href="/metrics" class="btn btn-outline-secondary mb-3 back-button">
    <i class="bi bi-arrow-left"></i> Zurück zu Metrics
</a>
<div class="container">
    <div class="top-boxes d-flex flex-column flex-md-row gap-3 mb-4">
        <div
            class="metric-box shadow p-4 bg-white rounded flex-fill border border-primary"
        >
            <p class="text-muted mb-2">
                <small
                    >Status: {editMode
                        ? "Bearbeitungsmodus"
                        : "Anzeigemodus"}</small
                >
            </p>

            {#if editMode}
                <form method="POST" action="?/update">
                    <div class="mb-3">
                        <label for="title" class="form-label">Titel</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            class="form-control"
                            bind:value={editedTitle}
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label"
                            >Beschreibung</label
                        >
                        <textarea
                            id="description"
                            name="description"
                            class="form-control"
                            rows="3"
                            bind:value={editedDescription}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-success"
                        ><i class="bi bi-save"></i> Speichern</button
                    >
                    <button
                        type="button"
                        class="btn btn-secondary ms-2"
                        on:click={toggleEdit}
                        ><i class="bi bi-x-lg"></i> Abbrechen</button
                    >
                </form>
            {:else}
                <h2 class="text-primary">
                    <i class="bi bi-bar-chart-line-fill me-2"></i>{data.metric
                        .title}
                </h2>
                <p>{data.metric.description}</p>
            {/if}

            <p><strong>Einheit:</strong> {data.metric.unit}</p>
            <p>
                <strong>Tags:</strong>
                {#each data.metric.tagNames as tag}
                    <span class="badge bg-secondary me-1">{tag}</span>
                {/each}
            </p>

            <div class="d-flex justify-content-start align-items-center mt-3">
                <button
                    class="btn btn-outline-primary me-2"
                    on:click={toggleEdit}
                >
                    <i class="bi bi-pencil"></i>
                    {editMode ? "Abbrechen" : "Bearbeiten"}
                </button>
                <form method="POST" action="?/delete">
                    <button
                        class="btn btn-outline-danger"
                        type="submit"
                        title="Löschen"
                    >
                        <i class="bi bi-trash"></i> Löschen
                    </button>
                </form>
            </div>
        </div>

        <div
            class="analysis-box shadow p-4 bg-light rounded border border-info flex-fill"
        >
            <h4 class="text-info">
                <i class="bi bi-graph-up-arrow me-2"></i>Auswertung
            </h4>
            <p class="mb-1"><strong>Durchschnitt:</strong> {average} {data.metric.unit} </p>
            <p class="mb-1"><strong>Max:</strong> {max} {data.metric.unit}</p>
            <p class="mb-1"><strong>Min:</strong> {min} {data.metric.unit}</p>
            <p class="mb-1">
                <strong>Anzahl Einträge:</strong>
                {data.datapoints.length}
            </p>
        </div>
    </div>

    <div class="datapoints-box shadow-sm bg-white p-4 rounded border">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h4 class="text-secondary mb-0">
                <i class="bi bi-table me-2"></i>Datapoints
            </h4>
            <button
                class="btn btn-sm btn-success"
                on:click={() => (showCreateRow = true)}
            >
                <i class="bi bi-plus-circle"></i> Neu
            </button>
        </div>
        <table class="table table-striped mt-2">
            <thead>
                <tr>
                    <th scope="col">Datum</th>
                    <th scope="col">Wert ({data.metric.unit})</th>
                    <th scope="col" class="text-end">Aktionen</th>
                </tr>
            </thead>
            <tbody>
                {#if showCreateRow}
                    <tr>
                        <td>
                            <input
                                type="date"
                                class="form-control form-control-sm"
                                bind:value={newDate}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                bind:value={newValue}
                            />
                        </td>
                        <td class="text-end">
                            <div
                                class="d-flex flex-column align-items-end gap-1"
                            >
                                <form method="POST" action="?/add" class="mb-0">
                                    <input
                                        type="hidden"
                                        name="date"
                                        value={newDate}
                                    />
                                    <input
                                        type="hidden"
                                        name="value"
                                        value={newValue}
                                    />

                                    <button
                                        type="submit"
                                        class="btn btn-sm btn-success"
                                        aria-label="Datapoint speichern"
                                        title="Datapoint speichern"
                                    >
                                        <i
                                            class="bi bi-check-lg"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </form>

                                <button
                                    type="button"
                                    class="btn btn-sm btn-secondary"
                                    on:click={() => (showCreateRow = false)}
                                    aria-label="Datapoint-Erstellung abbrechen"
                                    title="Datapoint-Erstellung abbrechen"
                                >
                                    <i class="bi bi-x-lg" aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                {/if}
                {#each data.datapoints as dp}
                    <tr>
                        <td>{new Date(dp.date).toLocaleDateString("de-CH")}</td>
                        <td>{dp.value}</td>
                        <td class="text-end">
                            <form method="POST" action="?/deleteDatapoint">
                                <input
                                    type="hidden"
                                    name="datapointId"
                                    value={dp._id}
                                />
                                <button
                                    class="btn btn-sm btn-outline-danger"
                                    type="submit"
                                    title="Löschen"
                                    aria-label="Datapoint löschen"
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .back-button {
        margin: 10px 10px 10px 10px;
    }

    .top-boxes {
        display: flex;
        flex-wrap: wrap;
    }

    .metric-box,
    .analysis-box,
    .datapoints-box {
        min-width: 300px;
        background-color: #fdfdfe;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .metric-box h2,
    .analysis-box h4,
    .datapoints-box h4 {
        margin-bottom: 1rem;
    }

    .badge {
        font-size: 0.9em;
    }

    .table td,
    .table th {
        vertical-align: middle;
        padding: 0.75rem;
    }

    .btn-outline-primary,
    .btn-outline-danger {
        transition: all 0.2s ease-in-out;
    }
    .btn-outline-primary:hover {
        background-color: #0d6efd;
        color: #fff;
    }
    .btn-outline-danger:hover {
        background-color: #dc3545;
        color: #fff;
    }
</style>
