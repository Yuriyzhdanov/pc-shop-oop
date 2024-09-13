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
  } else if (stringTypes.includes(type)) {
    return array.sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    )
  }
  return array.sort()
}

function normalizeStorageCapacity(storageCapacity) {
  return storageCapacity.map(capacity => capacity.replace(/,$/, ''))
}

function normalizeSpaceAfterNum(str) {
  return str.replace(/(\d+)\s*([a-zA-Z]+)/g, '$1 $2')
}

export {
  setWithLimits,
  sortAttrs,
  normalizeStorageCapacity,
  normalizeSpaceAfterNum,
}
