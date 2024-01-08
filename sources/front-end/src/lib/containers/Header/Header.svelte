<script>
  import {
    page,
  } from '$app/stores';
</script>

<style>
  header {
    --bottom-size: 0.125rem;

    grid-area: header;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
    ;
  }

  header > h1 {
    grid-area: title;
    line-height: normal;
    justify-self: center;
    align-self: stretch;
    color: var(--theme-black);
  }
</style>

<header>
  <h1>
    binning
  </h1>
</header>