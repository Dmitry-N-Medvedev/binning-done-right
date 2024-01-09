<script>
  import {
    BinningResultsStore,
  } from '$lib/stores/BinningResults.svelte.js';
  import MinMaxBoundary from '../MinMaxBoundary/MinMaxBoundary.svelte';
  import HorizontalCenter from '$lib/icons/HorizontalCenter.svelte';

  const toFixed = (n = 0, f = 2) => {
    return Number.parseFloat(n).toFixed(f);
  }
</script>

<style>
  .binning-results-component {
    --binning-results-gap: calc(var(--gap) / 2);

    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: var(--binning-results-gap);
    min-height: 100%;
    background-color: var(--theme-black);
  }

  .binning-result {
    display: grid;
    grid-template-areas:
      'bin-id bin-lower-boundary bin-upper-boundary bin-center bin-analyses'
    ;
    grid-template-columns: 4rem repeat(3, 1fr) 2fr;
    gap: var(--binning-results-gap);
    padding: var(--binning-results-gap);
    align-items: stretch;
    min-height: 4rem;
  }

  .bin-id {
    grid-area: bin-id;
  }

  .bin-lower-boundary {
    grid-area: bin-lower-boundary;
  }

  .bin-upper-boundary {
    grid-area: bin-upper-boundary;
  }

  .bin-center {
    grid-area: bin-center;
  }

  .bin-analyses {
    grid-area: bin-analyses;
  }

  :is(.bin-id, .bin-lower-boundary, .bin-upper-boundary, .bin-center, .bin-analyses) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-dark_gray);
  }

  .header-row {
    position: sticky;
    color: var(--theme-gray);
  }

  .header-row > div {
    background-color: var(--theme-light_gray_bright);
  }

  .header-row > .bin-center {
    color: var(--theme-white);
  }

  .binning-result-list {
    display: grid;
    overflow-y: auto;
    min-height: 100%;
  }
</style>

<div class="binning-results-component">
  <div id="header-row" class="binning-result header-row">
    <div class="bin-id">id</div>
    <div class="bin-lower-boundary">
      <MinMaxBoundary isN={true} />
    </div>
    <div class="bin-upper-boundary">
      <MinMaxBoundary isM={true} />
    </div>
    <div class="bin-center">
      <HorizontalCenter width="2.5rem" height="2.5rem" />
    </div>
    <div class="bin-analyses">analyses</div>
  </div>
  <div class="binning-result-list">
    {#each BinningResultsStore.state.values() as binningResult(binningResult.id)}
      <div id={binningResult.id} class="binning-result">
        <div class="bin-id">{binningResult.id}</div>
        <div class="bin-lower-boundary">{toFixed(binningResult.binLowerBoundary)}</div>
        <div class="bin-upper-boundary">{toFixed(binningResult.binUpperBoundary)}</div>
        <div class="bin-center">{binningResult.binCenter}</div>
        <div class="bin-analyses">{binningResult.analyses['avg']}</div>
      </div>  
  {/each}
  </div>
</div>