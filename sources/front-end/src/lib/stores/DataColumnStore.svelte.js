class DataColumn {
  state = $state([]);

  constructor() {
    const result = [];

    for (let i = 0; i < 100; i += 1) {
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
