import {
  Analyses,
} from '$lib/constants/analyses.js';

const fakeNetworkLatency = () => new Promise((resolve) => {
  const timeOut = () => Math.trunc(Math.random() * 100) + 100;
  const t = setTimeout(() => {
   clearTimeout(t); 
   resolve();
  }, timeOut());
}); 

const NUM_OF_BINNING_RESULTS_PER_JOB = 15; 

const genJob = async function* () {
  for (let i = 0; i < NUM_OF_BINNING_RESULTS_PER_JOB; i += 1) {
    const binLowerBoundary =  Math.random();
    const binUpperBoundary = Math.random() + binLowerBoundary;
    const binCenter = (binLowerBoundary + binUpperBoundary) / 2;
    const binningResult = {
      id: i,
      binLowerBoundary,
      binUpperBoundary,
      binCenter,
      analyses: new Map(),
    };

    for (const fieldName of Analyses) {
      binningResult.analyses.set(fieldName, 0.0);
    }

    yield binningResult;
  }
}


class BinningResults {
  #internalState = new Map();
  #activeJobId = null;
  state = $state(new Map());

  #refreshState() {
    if (this.#activeJobId === null) {
      return;
    }

    const newState = structuredClone(this.#internalState.get(this.#activeJobId));

    this.state = newState;
  }

  activateJobId(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    this.#activeJobId = jobId;
    this.#refreshState();
  }

  async #generateFakeStatistics(jobId = null, binningId = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    if (binningId === null) {
      throw new ReferenceError('binningId is undefined');
    }

    if (this.#internalState.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }

    const job = this.#internalState.get(jobId);

    const binningResult = job.get(binningId);


    for await(const field of Analyses) {
      await fakeNetworkLatency();

      binningResult.analyses.set(field, Math.random());

      job.set(binningId, binningResult);
      this.#internalState.set(job, job);

      this.#refreshState();
    }
  }

  async #generateFakeJobResults (jobId = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    } 

    const jobGenerator = genJob();

    for await (const binningResult of jobGenerator) {
      await fakeNetworkLatency();

      const job = this.#internalState.get(jobId);

      job.set(binningResult.id, structuredClone(binningResult));

      this.#internalState.set(jobId, job);
      this.#refreshState();
      this.#generateFakeStatistics(jobId, binningResult.id);
    }
  }

  registerJob(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    this.#internalState.set(jobId, new Map());
    this.#generateFakeJobResults(jobId);
  }
}

export const BinningResultsStore = new BinningResults();
