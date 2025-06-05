<script>
  export let metric;
</script>

<a href={`/metrics/${metric._id}`} class="text-decoration-none text-dark">
    <div class="card mb-3 p-3 border rounded shadow-sm">
        <h2 class="h5 mb-1 fw-bold text-primary">{metric.title}</h2>
        <p class="text-muted fst-italic mb-2">{metric.description}</p>
        <p class="mb-1">
            Einheit: <span class="fw-semibold">{metric.unit}</span>
        </p>
        <p>
            Tags:
            {#each metric.tagNames as tag}
                <span class="badge bg-secondary me-1">{tag}</span>
            {/each}
        </p>
    </div>
</a>
