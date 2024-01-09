<script>
  import {
    DataFileStore,
  } from '$lib/stores/DataFile.svelte.js';
  import FileLoader from "../lib/components/FileLoader/FileLoader.svelte";
  import Jobs from '$lib/components/Jobs/Jobs.svelte';

  /**
   * @typedef {import('../lib/structures/createDataFileStructure.js').DataFileStructure} DataFileStructure
  */

  /**
   * @param e {DataFileStructure}
   */
  const handleOnFile = (e = null) => {
    const {
      type = null,
      payload = null,
    } = e;

    if (typeof type === 'undefined' || type === null) {
      throw new TypeError('undefined event type', e);
    }

    if (type !== 'file') {
      return;
    }

    DataFileStore.setFile(payload);
  };
</script>

<style>
  article {
    --gap: 0.5rem;

    display: grid;
    height: 100%;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr 1fr;
    grid-template-areas:
      'file-loader-container file-loader-container'
      'jobs-container job-results-container'
      'binning-chart-container binning-chart-container'
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
    overflow-y: hidden;
  }
</style>

<article>
  <section class="file-loader-container">
    <FileLoader onFile={handleOnFile} />
  </section>
  <section class="jobs-container">
    <Jobs />
  </section>
</article>