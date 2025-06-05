<script>
    export let data;
</script>

<div class="background">
    <h1 class="display-3">Willkommen bei StatifyMe</h1>
    <p class="lead mt-4">Deine persönliche Metrikübersicht</p>
    <blockquote class="blockquote mt-5">
        <p>„{data.quote}“</p>
        <footer class="blockquote-footer text-white">– {data.author}</footer>
    </blockquote>
</div>
<div class="container mt-5 text-center">
    <h2>Was möchtest du tun?</h2>
    <div class="d-flex justify-content-center gap-3 mt-4">
        <a href="/metrics" class="btn btn-primary btn-lg">📊 Metriken ansehen</a
        >
        <a href="/datapoints" class="btn btn-outline-secondary btn-lg"
            >📝 Datapoints verwalten</a
        >
        <a href="/charts" class="btn btn-success btn-lg">📈 Charts</a>
    </div>
</div>

<style>
    .background {
        background-image: url("/images/hero.png");
        background-size: cover;
        background-position: center;
        height: 70vh;
        overflow: hidden;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 3rem;
        position: relative;
    }

    .background::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 0;
    }

    .background > * {
        position: relative;
        z-index: 1;
    }

    h1,
    .lead {
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
    }

    blockquote {
        font-family: "Georgia", serif;
        font-style: italic;
        font-size: 1.6rem;
        opacity: 0.95;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
    }

    .blockquote-footer {
        font-size: 1rem;
        font-style: normal;
        opacity: 0.9;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
</style>
