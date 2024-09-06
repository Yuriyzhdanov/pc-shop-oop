import Product from './Product.class.js'

class Catalog {
  constructor(search, attrSelector, priceRanger, sorter, paginator) {
    this.products = []
    this.search = search
    this.attrSelector = attrSelector
    this.priceRanger = priceRanger
    this.sorter = sorter
    this.paginator = paginator
    this.favoritesCount = 0
  }

  computeProducts() {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    const paginator = this.paginator.run(sorted)
    return paginator
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

  async checkFavorite(favoritesIds) {
    for (const product of this.products) {
      if (favoritesIds.includes(product.id)) {
        await product.addToFavorites()
        viewCatalog.updateFavoriteButton(product.id, true)
      }
    }
  }

  countFavorites() {
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
