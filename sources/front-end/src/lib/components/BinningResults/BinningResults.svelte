<script>
  import {
    BinningResultsStore,
  } from '$lib/stores/BinningResults.svelte.js';
  import Table from '$lib/components/Table/Table.svelte';
  import MinMaxBoundary from '../MinMaxBoundary/MinMaxBoundary.svelte';
  import HorizontalCenter from '$lib/icons/HorizontalCenter.svelte';
  import MultiValueCell from '../MultiValueCell/MultiValueCell.svelte';
  import {
    formatNumber,
  } from '$lib/helpers/formatNumber.js';
  import {
    toFixed,
  } from '$lib/helpers/toFixed.js';

  let itemsMap = $derived(BinningResultsStore.state);
</script>

<style>
  .binning-result {
    --visibility-on-hover: hidden;
    --binning-results-gap: var(--gap);

    display: grid;
    grid-template-areas:
      'bin-id bin-lower-boundary bin-upper-boundary bin-center bin-analyses'
    ;
    grid-template-columns: 4rem repeat(3, 8rem) 1fr;
    gap: var(--binning-results-gap);
    padding: var(--binning-results-gap);
    align-items: stretch;

    cursor: pointer;
  }

  .table-rows {
    pointer-events: auto;
  }

  .table-rows > .binning-result:hover,
  .table-rows > .binning-result:hover > div
  {
    --visibility-on-hover: visible;

    color: var(--theme-black);
    background-color: var(--theme-green);
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

  .table-rows > .binning-result > .bin-analyses {
    grid-area: bin-analyses;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :is(.bin-id, .bin-lower-boundary, .bin-upper-boundary, .bin-center, .bin-analyses) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-dark_gray);
  }

  .header-row > div {
    background-color: var(--theme-light_gray_bright);
  }

  .header-row > .bin-center {
    color: var(--theme-white);
  }
</style>

<Table>
  <div slot="table-rows" class="table-rows">
    <div class="binning-result">
      <div class="bin-id">bin</div>
      <div class="bin-lower-boundary">
        <MinMaxBoundary isN={true} />
      </div>
      <div class="bin-upper-boundary">
        <MinMaxBoundary isM={true} />
      </div>
      <div class="bin-center">
        <HorizontalCenter width="2.5rem" height="2.5rem" />
      </div>
      <div class="bin-analyses">
        analyses
      </div>
    </div>
    {#each itemsMap?.values() as binningResult(binningResult.id)}
      <div id={binningResult.id} class="binning-result">
        <div class="bin-id">{binningResult.id}</div>
        <div class="bin-lower-boundary">{toFixed(binningResult.binLowerBoundary, 3)}</div>
        <div class="bin-upper-boundary">{toFixed(binningResult.binUpperBoundary, 3)}</div>
        <div class="bin-center">{toFixed(binningResult.binCenter)}</div>
        <div class="bin-analyses">
          <MultiValueCell dataObject={binningResult.analyses} format={formatNumber} />
        </div>
      </div>  
  {/each}
  </div>
</Table>
