class JobResults {
  state = $state(new Map());

  #checkInput(jobId = null, jobResults = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    if (jobResults === null) {
      throw new ReferenceError('jobResults is undefined');
    }

    if ((jobResults instanceof Map) === false) {
      throw new TypeError('jobResults is not a Map');
    }
  }

  #addNewJobResults(jobId = null, jobResults = null) {
    this.state = structuredClone(this.state).set(jobId, jobResults);
  }

  updateJobResults(jobId = null, jobResults = null) {
    this.#checkInput(jobId, jobResults);

    if (this.state.has(jobId) === false) {
      this.#addNewJobResults(jobId, jobResults);
    } else {
      throw new Error('updating jobResults is not yet implemented');
    }
  }
}

export const JobResultsStore = new JobResults();