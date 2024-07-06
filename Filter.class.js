class Filter {
  updateFilter(products) {
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

  clearFilter() {
    // this = {}
  }
}
module.exports = Filter
