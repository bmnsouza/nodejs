class Random {

  constructor(seed) {
    if (!seed) {
      throw new Error('The seed must be informed')
    }

    // LCG using GCC's constants
    this.m = 0x80000000 // 2**31
    this.a = 1103515245
    this.c = 12345
    
    this.state = Math.abs(seed)
  }

  nextFloat() {
    // Returns in range [0,1]
    return this.nextInt() / (this.m - 1)
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m
    return this.state
  }

  next(end) {
    // Returns in range [1, end)
    return this.nextRange(1, end)
  }

  nextRange(start, end) {
    // Returns in range [start, end)
    const rangeSize = end - start
    const randomUnder1 = this.nextInt() / this.m
    return start + Math.floor(randomUnder1 * rangeSize)
  }
}

module.exports = Random