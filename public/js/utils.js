const utils = {
  setWithLimits(newVal, max, min) {
    const LIMIT_MAX = max
    const LIMIT_MIN = min
    return Math.max(LIMIT_MIN, Math.min(newVal, LIMIT_MAX))
  },
}

export default utils
