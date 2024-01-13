class DataColumn {
  state = $state([]);

  constructor() {
    const result = [];

    result.push({
      id: 0,
      value: 0,
      bin: 0,
    })

    for (let i = 1; i < 100; i += 1) {
      const isBelowZero = Math.random() < 0.5;
      const absValue = Math.random();
      const value = {
        id: i,
        value: (isBelowZero ? 0 - absValue : absValue ),
        bin: 0,
      };

      result.push(value);
    }

    this.state = structuredClone(result);
  }
}

export const DataColumnStore = new DataColumn();
