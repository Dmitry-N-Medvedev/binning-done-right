class Jobs {
  state = $state(new Map());

  constructor() {
    for (let i = 0; i < 10; i += 1) {
      const recordsTotal = Math.trunc(Math.random() * 10000 + 100);
      const job = {
        id: crypto.randomUUID(),
        sourceFileName: `${crypto.randomUUID()}.csv`,
        progress: {
          recordsTotal,
          recordsProcessed: Math.trunc(recordsTotal * Math.random()),
        },
        channelName: 'RM_WS_HUG_Std [m/s]',
      };

      this.state.set(job.id, job);
    }
  }

  add(sourceFileName = null) {
    if (sourceFileName === null) {
      throw new ReferenceError('sourceFileName is undefined');
    }

    const job = {
      id: crypto.randomUUID(),
      sourceFileName,
      progress: {
        recordsTotal: Math.trunc(Math.random() * 10000 + 100),
        recordsProcessed: 0,
      },
      channelName: 'RM_WS_HUG_Std [m/s]',
    };

    this.state.set(job.id, job);
  }
}

export const JobsStore = new Jobs();
