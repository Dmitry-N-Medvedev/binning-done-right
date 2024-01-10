<script>
  import {
    BinningResultsStore,
  } from '$lib/stores/BinningResults.svelte.js';
  import Table from '$lib/components/Table/Table.svelte';
  import MinMaxBoundary from '../MinMaxBoundary/MinMaxBoundary.svelte';
  import HorizontalCenter from '$lib/icons/HorizontalCenter.svelte';
  import MultiValueCell from '../MultiValueCell/MultiValueCell.svelte';

  const toFixed = (n = 0, f = 2) => {
    return Number.parseFloat(n).toFixed(f);
  }

  /**
   * 
   * @param key {String | null}
   * @param value {String | null}
   */
  const format = (key = null, value = null) => {
    switch(key) {
      case 'avg': 
      case 'mean':
      case 'sum':
      case 'min':
      case 'max':
      {
        return toFixed(Number.parseFloat(value), 5);
      }
      case 'median': {
        return toFixed(Number.parseFloat(value), 2);
      }
      default: {
        throw new TypeError(`unknown key: ${key}`);
      }
    }
  };
</script>

<style>
  /* :root {
    --table-background-color: var(--theme-black);
    --table-results-gap: calc(var(--gap) / 2);
    --table-caption-color: var(--main-background-color);
    --table-header-row-color: var(--theme-white);
  } */

  .binning-result {
    --visibility-on-hover: hidden;
    --binning-results-gap: var(--gap);

    display: grid;
    grid-template-areas:
      'bin-id bin-lower-boundary bin-upper-boundary bin-center bin-analyses'
    ;
    grid-template-columns: 4rem repeat(3, 1fr) 2fr;
    gap: var(--binning-results-gap);
    padding: var(--binning-results-gap);
    align-items: stretch;
    min-height: 4rem;

    cursor: pointer;
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
    justify-content: stretch;
    align-items: stretch;
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
  <span slot="table-caption" class="table-caption">binning results</span>
  <div slot="table-header-row">
    <div class="binning-result">
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
  </div>
  <div slot="table-rows" class="table-rows">
    {#each BinningResultsStore.state.values() as binningResult(binningResult.id)}
      <div id={binningResult.id} class="binning-result">
        <div class="bin-id">{binningResult.id}</div>
        <div class="bin-lower-boundary">{toFixed(binningResult.binLowerBoundary, 3)}</div>
        <div class="bin-upper-boundary">{toFixed(binningResult.binUpperBoundary, 3)}</div>
        <div class="bin-center">{toFixed(binningResult.binCenter)}</div>
        <div class="bin-analyses">
          <MultiValueCell dataObject={binningResult.analyses} {format} />
          <!-- {#each binningResult.analyses.entries() as [analysisName, analysisValue](analysisName)}
            <div class="bin-analysis" data-analysis-name={analysisName}>
              {toFixed(binningResult.analyses.get(analysisName), 5)}
            </div>
          {/each} -->
        </div>
      </div>  
  {/each}
  </div>
</Table>
