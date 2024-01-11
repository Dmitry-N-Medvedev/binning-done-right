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
      channelName: 'RM_WS_HUG_Std [m/s]',
    };

    this.state = structuredClone(this.state).set(job.id, job);

    return id;
  }
}

export const JobsStore = new Jobs();
