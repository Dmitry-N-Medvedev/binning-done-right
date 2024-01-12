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
</style>

<article>
  <section class="file-loader-container">
    <FileLoader onFile={handleUploadFileRequest} />
  </section>
  <section class="jobs-container">
    <Jobs />
  </section>
  <section class="field-data-container">
    <DataFieldComponent />
  </section>
  <section class="job-results-container">
    <BinningResults />
  </section>
  <section class="binning-chart-container">
    <BinningChart />
  </section>
</article>