function checkNumber(number) {
  if (!Number.isFinite(number)) {
    console.log('Provided value is not a valid number')
  }
  return number
}

function setWithLimits(newVal, max, min) {
  checkNumber(newVal)
  const LIMIT_MAX = max
  const LIMIT_MIN = min
  return Math.max(LIMIT_MIN, Math.min(newVal, LIMIT_MAX))
}

function sortAttrs(array, type) {
  const numericTypes = [
    'Количество ядер',
    'Объем ОЗУ',
    'Объем накопителя',
    'Блок питания',
    'Частота ОЗУ',
    'Частота процессора',
  ]

  const stringTypes = [
    'Тип ОЗУ',
    'Тип накопителя',
    'Процессор',
    'Материнская плата',
  ]

  if (numericTypes.includes(type)) {
    return array.sort((a, b) => parseFloat(a) - parseFloat(b))
  } else {
    return array.sort()
  }
}

function normalizeTrailingComma(value) {
  return value.replace(/,$/, '')
}

function normalizeSpaceAfterNum(value) {
  return value.replace(/(\d+)\s*([a-zA-Z]+)/g, '$1 $2')
}

function normalizeAttributes(attributes) {
  const normalizedProduct = {}
  const sortedKeys = Object.keys(attributes).sort()
  sortedKeys.forEach(key => {
    let value = attributes[key]
    if (typeof value === 'string') {
      value = normalizeSpaceAfterNum(value)
      value = normalizeTrailingComma(value)
    }
    normalizedProduct[key] = value
  })

  return normalizedProduct
}

export { normalizeAttributes, setWithLimits, sortAttrs }
