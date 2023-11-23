export class Stream {
  #iterable; //con esto es privado y no publico

  constructor(iterable) {
    this.#iterable = iterable;
  }

  map(f) {
    function* gen(iterable) {
      for (const e of iterable) {
        yield f(e);
      }
    }
    return new Stream(gen(this.#iterable));
  }

  toList() {
    // Caution: only for finite Streams();
    return [...this.#iterable];
  }

  filter(p) {
    function* gen(iterable) {
      for (const e of iterable) {
        if (p(e)) yield e;
      }
    }
    return new Stream(gen(this.#iterable));
  }

  cut(n) {
    function* gen(n, iterable) {
      for (const e of iterable) {
        if (n-- > 0) yield e;
        else break;
      }
      return;
    }
    return new Stream(gen(n, this.iterable));
  }
  iterate(init, increment) {
    function* gen(init = 0, increment = 1) {
      let current = init;
      let iterations = 0;
      const maxIterations = 1000000;
      while (iterations < maxIterations) {
        yield current;
        current += increment;
        iterations++;
      }
    }
    return new Stream(gen(init, increment));
  }
}
