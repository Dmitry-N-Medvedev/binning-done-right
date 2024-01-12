import {
  BinningResultsStore,
} from '$lib/stores/BinningResults.svelte.js';
import {
  JobResultsStore,
} from '$lib/stores/JobResults.svelte.js';
import {
  JobsStore,
} from '$lib/stores/Jobs.svelte.js';

const NETWORK_FRAME_SIZE = 1500;
const generateInitialJobResult = () => {
  const result = new Map();

  for (let i = 0; i < 10; i += 1) {
    const id = crypto.randomUUID();
    result.set(id, {
      id,
      binLowerBoundary: 0,
      binUpperBoundary: 0,
      binCenter: 0,
      analyses: new Map([
        ['min', 0],
        ['max', 0],
        ['avg', 0],
        ['mean', 0],
        ['median', 0],
      ]),
    });
  }

  return result;
}

const fakeNetworkLatency = () => new Promise((resolve) => {
  const timeOut = () => Math.random() * 10 + 1;
  const t = setTimeout(() => {
   clearTimeout(t); 
   resolve();
  }, timeOut());
}); 

/**
 * 
 * @param {File} fileObject 
 * @param {string} jobId 
 * @returns {Promise}
 */
const uploadFile = async(fileObject, jobId) => {
  JobsStore.updateNumberOfChunksToUpload(jobId, Math.trunc(fileObject.size / NETWORK_FRAME_SIZE));

  const genReadChunks = async function* () {
    const fileStreamReader = new ReadableStreamBYOBReader(fileObject.stream());

    while(true) {
      const view = new Uint8Array(NETWORK_FRAME_SIZE);
      const { done, value } = await fileStreamReader.read(view);

      await fakeNetworkLatency();

      if (done === false) {
        yield { done, value };
      } else {
        return;
      }
    }
  };

  const tx = crypto.randomUUID();
  const chunkGenerator = genReadChunks();

  for await (const { done, value } of chunkGenerator) {
    await sendChunk(jobId, value, tx, done);
  }

  return Promise.resolve;
};
 
/**
  * @param jobId {string} 
  * @param frame {Uint8Array}
  * @param frameCounter {Number}
  * @param tx {String}
 */
const sendChunk = async(jobId, frame, tx, done) => {
  const networkMessageObject = {
    type: 'csv',
    meta: {
      tx,
      done,
    },
    payload: frame,
  };

  // JobsStore.update(jobId, extra);
  JobsStore.updateNewChunkUploaded(jobId);

  // const networkMessage = (new TextEncoder()).encode(JSON.stringify(networkMessageObject));

  // console.log({ networkMessage, exceeds: networkMessage.byteLength - NETWORK_FRAME_SIZE });

  return Promise.resolve;
};

/**
 * 
 * @param {File} fileObject 
 */
export const fakeJobResults = async(fileObject = null) => {
  if (fileObject === null) {
    throw new ReferenceError('fileObject is undefined');
  }

  if ((fileObject instanceof File) === false) {
    throw new TypeError('fileObject is not a File');
  }

  const jobId = JobsStore.add(fileObject);

  return await uploadFile(fileObject, jobId);

  // const initialJobResult = generateInitialJobResult();

  // BinningResultsStore.add(initialJobResult);
};