class BinningResults {
  state = $state(new Map());

  constructor() {
    const result = new Map();

    for (let i = 0; i < 20; i += 1) {
      const binLowerBoundary =  Math.random();
      const binUpperBoundary = Math.random() + binLowerBoundary;
      const binCenter = (binLowerBoundary + binUpperBoundary) / 2;
      const binningResult = {
        id: i,
        binLowerBoundary,
        binUpperBoundary,
        binCenter,
        analyses: new Map([
          ['avg', Math.random()],
          ['mean', Math.random()],
          ['sum', Math.random()],
          ['max', Math.random()],
          ['min', Math.random()],
          ['median', Math.random()],
        ]),
      };

      result.set(binningResult.id, binningResult);
    }

    this.state = result;
  }
}

export const BinningResultsStore = new BinningResults();
