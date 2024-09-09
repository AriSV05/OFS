export class Stream {
  #iterable; //con esto es privado y no publico

  constructor(iterable) {
    this.#iterable = iterable;
  }

  map(f){
    for(const e of this.#iterable){
        f(e)
    }
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
    return new Stream(gen(n, this.#iterable));
  }
  
  static iterate(init, increment) {
    function* gen(init2 = 0, increment2 = 1) {
      let current = init2;
      let iterations = 0;
      const maxIterations = 1000000;
      while (iterations < maxIterations) {
        yield current;
        current = increment2(current);
        iterations++;
      }
    }
    return new Stream(gen(init, increment));
  }
}