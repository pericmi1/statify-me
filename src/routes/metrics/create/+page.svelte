<script>
    export let data;

    let title = "";
    let description = "";
    let unit = "";
    let selectedTags = [];
    let availableTags = data.availableTags;

    function toggleTag(tag) {
        const id = tag._id;
        if (selectedTags.includes(id)) {
            selectedTags = selectedTags.filter((t) => t !== id);
        } else {
            selectedTags = [...selectedTags, id];
        }
    }
</script>

<div class="create-wrapper">
    <h1>Neue Metric erstellen</h1>
    <form method="POST" class="mt-4">
        <div class="mb-3">
            <label class="form-label">Titel</label>
            <input
                class="form-control"
                name="title"
                bind:value={title}
                placeholder="z. B. Wasser trinken"
            />
        </div>

        <div class="mb-3">
            <label class="form-label">Beschreibung</label>
            <textarea
                class="form-control"
                name="description"
                bind:value={description}
                rows="3"
                placeholder="z. B. Tägliche Wasseraufnahme verfolgen"
            ></textarea>
        </div>

        <div class="mb-3">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="form-label">Einheit</label>
            <input
                class="form-control"
                name="unit"
                bind:value={unit}
                placeholder="z. B. Tassen, Stunden"
            />
        </div>

        <div class="mb-3">
            <label class="form-label">Tags</label>
            <div>
                {#each availableTags as tag}
                    <button
                        type="button"
                        class="btn btn-sm me-2 mb-2 {selectedTags.includes(
                            tag._id,
                        )
                            ? 'btn-primary'
                            : 'btn-outline-secondary'}"
                        on:click={() => toggleTag(tag)}
                    >
                        {tag.name}
                    </button>
                {/each}
                {#each selectedTags as tagId}
                    <input type="hidden" name="tags" value={tagId} />
                {/each}
            </div>
        </div>

        <button type="submit" class="btn btn-success">Erstellen</button>
    </form>
</div>

<style>
    .create-wrapper {
        max-width: 700px;
        margin: 0 auto;
        padding: 1rem;
    }
</style>
