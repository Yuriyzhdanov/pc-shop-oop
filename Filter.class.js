class Filter {
  constructor() {
    this.filter = {}
  }

  run(products) {
    const filteredProducts = products.filter(product => {
      for (const key in this.filter) {
        if (
          this.filter[key].length > 0 &&
          !this.filter[key].includes(product.attributes[key])
        ) {
          return false
        }
      }
      return true
    })
    return filteredProducts
  }

  clearFilter() {
    this.filter = {}
  }

  addFilter(key, values) {
    this.filter[key] = values
  }
}
module.exports = Filter
