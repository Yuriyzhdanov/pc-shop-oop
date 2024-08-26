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
      return array.sort(
        (a, b) =>
          parseInt(a.replace(/[^0-9]/g, '')) -
          parseInt(b.replace(/[^0-9]/g, ''))
      )
    case 'Частота процессора':
      return array.sort(
        (a, b) =>
          parseFloat(a.replace(/[^\d.]/g, '')) -
          parseFloat(b.replace(/[^\d.]/g, ''))
      )
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

export { setWithLimits, sortAttrs, normalizeStorageCapacity }
