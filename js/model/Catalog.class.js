import Product from './Product.class.js'

class Catalog {
  constructor(search, attrSelector, priceRanger, sorter, paginator) {
    this.products = []
    this.search = search
    this.attrSelector = attrSelector
    this.priceRanger = priceRanger
    this.sorter = sorter
    this.paginator = paginator
  }

  computeProducts(isResetPrice) {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    if (isResetPrice) {
      modelShop.priceRanger.calcMinMax(attributed)
      modelShop.priceRanger.resetFromTo()
    }
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    return this.paginator.run(sorted)
  }

  getCaptions() {
    return this.products.map(product => product.caption)
  }

  addProducts(products, currencyRate, api) {
    products.forEach(product => this.addProduct(product, currencyRate, api))
  }

  addProduct(product, currencyRate, api) {
    const createdProduct = new Product(product, api)
    createdProduct.convertPrice(currencyRate)
    this.products.push(createdProduct)
  }

  checkFavorite(favoritesIds) {
    for (const product of this.products) {
      if (favoritesIds.includes(product.id)) {
        product.isFavorite = true
      }
    }
  }

  computeFavoritesCount() {
    return this.products.reduce((acc, product) => acc + product.isFavorite, 0)
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  clear() {
    this.products = []
  }
}

export default Catalog
