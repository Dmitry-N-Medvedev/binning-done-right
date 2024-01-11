import {
  BinningResultsStore,
} from '$lib/stores/BinningResults.svelte.js';
import {
  JobResultsStore,
} from '$lib/stores/JobResults.svelte.js';
import {
  JobsStore,
} from '$lib/stores/Jobs.svelte.js';

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

export const fakeJobResults = (fileObject = null) => {
  if (fileObject === null) {
    throw new ReferenceError('fileObject is undefined');
  }

  if ((fileObject instanceof File) === false) {
    throw new TypeError('fileObject is not a File');
  }

  const jobId = JobsStore.add(fileObject);
  const initialJobResult = generateInitialJobResult();

  BinningResultsStore.add(initialJobResult);
};