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
  switch (type) {
    case 'Количество ядер':
    case 'Объем ОЗУ':
      return array.sort((a, b) => parseInt(a) - parseInt(b))
    case 'Объем накопителя':
    case 'Блок питания':
    case 'Частота ОЗУ':
      return array.sort((a, b) => parseInt(a) - parseInt(b))
    case 'Частота процессора':
      return array.sort()
    case 'Тип ОЗУ':
    case 'Тип накопителя':
    case 'Процессор':
    case 'Материнская плата':
      return array.sort()
    default:
      return array.sort()
  }
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
