class Filter {
  update(products) {
    const specs = products.map(product => product.attributes)
    for (const spec of specs) {
      for (const key in spec) {
        const value = spec[key]
        if (!this[key]) {
          this[key] = []
        }
        if (!this[key].includes(value)) {
          this[key].push(value)
        }
      }
    }
  }

  clear() {
    Object.keys(this).forEach(prop => delete this[prop])
  }
}

export default filter

// modelFilter[key] = normalizeStorageCapacity(modelFilter[key])
// modelFilter[key] = sortAttrs(modelFilter[key], key)

// function sortAttrs(array, type) {
//   switch (type) {
//     case 'Количество ядер':
//     case 'Объем ОЗУ':
//       return array.sort((a, b) => parseInt(a) - parseInt(b))
//     case 'Объем накопителя':
//     case 'Блок питания':
//     case 'Частота ОЗУ':
//       return array.sort(
//         (a, b) =>
//           parseInt(a.replace(/[^0-9]/g, '')) -
//           parseInt(b.replace(/[^0-9]/g, ''))
//       )
//     case 'Частота процессора':
//       return array.sort(
//         (a, b) =>
//           parseFloat(a.replace(/[^\d.]/g, '')) -
//           parseFloat(b.replace(/[^\d.]/g, ''))
//       )
//     case 'Тип ОЗУ':
//     case 'Тип накопителя':
//     case 'Процессор':
//     case 'Материнская плата':
//       return array.sort()
//     default:
//       return array.sort()
//   }
// }

// function normalizeStorageCapacity(storageCapacity) {
//   return storageCapacity.map(capacity => capacity.replace(/,$/, ''))
// }
