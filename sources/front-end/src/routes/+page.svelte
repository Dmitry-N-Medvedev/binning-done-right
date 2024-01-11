<script>
  import {
    JobsStore,
  } from '$lib/stores/Jobs.svelte.js';
  import FileLoader from "../lib/components/FileLoader/FileLoader.svelte";
  import Jobs from '$lib/components/Jobs/Jobs.svelte';
  import BinningResults from '$lib/components/BinningResults/BinningResults.svelte';
  import BinningChart from '$lib/components/BinningChart/BinningChart.svelte';

  import {
    fakeJobResults,
  } from '$lib/scripts/fakeJobResults.svelte.js';

  const NETWORK_FRAME_SIZE = 1500;

  /**
   * @typedef {import('../lib/structures/createDataFileStructure.js').DataFileStructure} DataFileStructure
  */

  /**
   * @param e {DataFileStructure | null}
   */
  const handleOnFile = async(e = null) => {
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

    const fileStreamReader = new ReadableStreamBYOBReader(payload.stream());

    let frameCounter = 0;

    while(true) {
      const view = new Uint8Array(NETWORK_FRAME_SIZE);
      const { done, value } = await fileStreamReader.read(view);

      if (done) {
        return Promise.resolve;
      } else {
        sendChunk(value, frameCounter, tx);

        frameCounter += 1;
      }
    }

    // fakeJobResults(payload);
  };

  /**
   * 
   * @param frame {Uint8Array}
   * @param frameCounter {Number}
   * @param tx {String}
   */
  const sendChunk = async(frame, frameCounter, tx) => {
    const networkMessageObject = {
      type: 'csv',
      meta: {
        tx,
        frameCounter,
      },
      payload: frame,
    };
    
    const networkMessage = (new TextEncoder()).encode(JSON.stringify(networkMessageObject));

    console.log({ networkMessage, exceeds: networkMessage.byteLength - NETWORK_FRAME_SIZE });

    return Promise.resolve;
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
  }

  .job-results-container {
    grid-area: job-results-container;
  }

  .binning-chart-container {
    grid-area: binning-chart-container;
  }

  :is(.jobs-container, .job-results-container, .binning-chart-container) {
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
  <section class="job-results-container">
    <BinningResults />
  </section>
  <section class="binning-chart-container">
    <BinningChart />
  </section>
</article>