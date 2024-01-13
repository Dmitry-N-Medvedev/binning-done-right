<script>
  import {
    JobsStore,
  } from '$lib/stores/Jobs.svelte.js';
  import FileLoader from "../lib/components/FileLoader/FileLoader.svelte";
  import Jobs from '$lib/components/Jobs/Jobs.svelte';
  import BinningResults from '$lib/components/BinningResults/BinningResults.svelte';
  import BinningChart from '$lib/components/BinningChart/BinningChart.svelte';
  import DataFieldComponent from '$lib/components/DataFieldComponent/DataFieldComponent.svelte';

  import {
    fakeJobResults,
  } from '$lib/scripts/fakeJobResults.svelte.js';

  /**
   * @typedef {import('../lib/structures/createDataFileStructure.js').DataFileStructure} DataFileStructure
  */

  /**
   * @param e {DataFileStructure | null}
   */
  const handleUploadFileRequest = async(e = null) => {
    const {
      type = null,
      /**
       * @type {File}
      */
      payload = null,
    } = e;
    const tx = crypto.randomUUID();

    if (typeof type === 'undefined' || type === null) {
      throw new TypeError('undefined event type', e);
    }

    if (type !== 'file') {
      throw new TypeError('not of the "file" type');
    }

    fakeJobResults(payload);
  };

</script>

<style>
  article {
    --table-caption-font-size: 4rem;
    --table-caption-font-weight: 900;
    --table-caption-text-transform: uppercase;
    --table-caption-font-variation-settings: "wght" 900, "opsz" 32;

    --gap: 0.5rem;

    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-rows: auto 1fr 1fr;
    grid-template-areas:
      'file-loader-container file-loader-container file-loader-container'
      'jobs-container field-data-container job-results-container'
      'binning-chart-container binning-chart-container binning-chart-container'
    ;
    gap: var(--gap);

    width: 80%;
    margin: 0 auto;
  }

  .file-loader-container {
    grid-area: file-loader-container;
    display: flex;
  }

  .jobs-container {
    grid-area: jobs-container;
  }

  .field-data-container {
    grid-area: field-data-container;
  }

  .job-results-container {
    grid-area: job-results-container;
  }

  .binning-chart-container {
    grid-area: binning-chart-container;
  }

  :is(.jobs-container, .field-data-container, .job-results-container, .binning-chart-container) {
    overflow-y: hidden;
  }

  :is(.field-data-container, .job-results-container) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    grid-template-areas:
      'section-caption'
      'section-content'
    ;
  }

  .section-caption {
    grid-area: section-caption;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--main-background-color);
    background-color: var(--theme-black);

    font-size: var(--table-caption-font-size);
    font-weight: var(--table-caption-font-weight);
    text-transform: var(--table-caption-text-transform);
    font-variation-settings: var(--table-caption-font-variation-settings);
  }

  .section-content {
    grid-area: section-content;
    display: contents;
  }
</style>

<article>
  <section class="file-loader-container">
    <FileLoader onFile={handleUploadFileRequest} />
  </section>
  <section class="jobs-container">
    <Jobs />
  </section>
  <section class="field-data-container">
    <div class="section-caption">wind shear rm</div>
    <div class="section-content">
      <DataFieldComponent />
    </div>
  </section>
  <section class="job-results-container">
    <div class="section-caption">binning results</div>
    <div class="section-content">
      <BinningResults />
    </div>
  </section>
  <section class="binning-chart-container">
    <BinningChart />
  </section>
</article>