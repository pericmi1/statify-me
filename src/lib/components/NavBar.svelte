<script>
  import { page } from '$app/stores';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom px-4">
  <a class="navbar-brand d-flex align-items-center text-primary fw-bold" href="/">
    <img src="/images/logo.png" alt="Logo" width="32" height="32" class="me-2" />
    StatifyMe
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto me-4">
      <li class="nav-item">
        <a class="nav-link fw-bold fs-5" href="/metrics">Metrics</a>
      </li>
      <li class="nav-item">
        <a class="nav-link fw-bold fs-5" href="/datapoints">Datapoints</a>
      </li>
      <li class="nav-item">
        <a class="nav-link fw-bold fs-5" href="/charts">Charts</a>
      </li>
    </ul>
  </div>
</nav>

