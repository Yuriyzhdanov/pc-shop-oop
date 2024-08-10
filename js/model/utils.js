function checkNumber(number) {
  // body
  return number
}

function setWithLimits(newVal, max, min) {
  checkNumber(newVal)
  const LIMIT_MAX = max
  const LIMIT_MIN = min
  return Math.max(LIMIT_MIN, Math.min(newVal, LIMIT_MAX))
}

export { checkNumber, setWithLimits }
