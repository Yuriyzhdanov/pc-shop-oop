class Filter {
  constructor() {
    this.filter = {}
  }

  createFilter(products) {
    // console.log('createFilter/products', products) 
    const specs = products.map(product => product.attributes)
    for (const spec of specs) {
      for (const key in spec) {
        const value = spec[key]
        if (!this.filter[key]) {
          this.filter[key] = []
        }
        if (!this.filter[key].includes(value)) {
          this.filter[key].push(value)
        }
      }
    }
  }

  run(products) {
    return products.filter(product => {
      for (const key in this.filter) {
        if (!this.filter[key].includes(product.attributes[key])) {
          return false
        }
      }
    })
  }

  clearFilter() {
    this.filter = {}
  }
}
module.exports = Filter
