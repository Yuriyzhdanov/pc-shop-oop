import { sortAttrs, normalizeStorageCapacity } from './utils.js'

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
        this[key] = normalizeStorageCapacity(this[key])
        this[key] = sortAttrs(this[key], key)
      }
    }
  }

  clear() {
    Object.keys(this).forEach(prop => delete this[prop])
  }
}

export default Filter
