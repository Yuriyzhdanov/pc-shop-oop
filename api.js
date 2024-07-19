const products = require('./products.json')

const api = {
  async loadProducts() {
    return products
  },
}

module.exports = api
