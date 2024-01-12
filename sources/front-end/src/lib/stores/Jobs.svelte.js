class Jobs {
  state = $state(new Map());

  add(fileObject = null) {
    if (fileObject === null) {
      throw new ReferenceError('fileObject is undefined');
    }

    const id = crypto.randomUUID();
    const job = {
      id,
      file: fileObject,
      progress: {
        recordsTotal: 0,
        recordsProcessed: 0,
      },
      extra: {
        numOfChunksToUpload: 0,
        numOfUploadedChunks: 0,
      },
      channelName: 'RM_WS_HUG_Std [m/s]',
    };

    this.state = structuredClone(this.state).set(job.id, job);

    return id;
  }

  updateNumberOfChunksToUpload(jobId = null, numOfChunks = 0) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }

    if (numOfChunks === 0) {
      throw new RangeError(`numOfChunks should not equal ${numOfChunks}`);
    }

    const job = this.state.get(jobId);

    job.extra.numOfChunksToUpload = numOfChunks;

    const newState = structuredClone(this.state);

    newState.set(jobId, job);

    this.state = newState;
  }

  updateNewChunkUploaded(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }

    const newState = structuredClone(this.state);
    const job = newState.get(jobId);
    
    job.extra.numOfUploadedChunks = job.extra.numOfUploadedChunks + 1;

    newState.set(jobId, job);

    this.state = newState;
  }

  update(jobId = null, payload = null) {
    if (jobId === null) {
      throw new ReferenceError('jobId is undefined');
    }

    if (payload === null) {
      throw new ReferenceError('payload is undefined');
    }

    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job with ${jobId} has not been found`);
    }

    const job = this.state.get(jobId);
    const updatedJob = {
      ...job,
      ...payload,
    };

    console.log({ job, updatedJob });

    const newState = structuredClone(this.state);
    newState.set(jobId, updatedJob);
    this.state = newState;
  }
}

export const JobsStore = new Jobs();
