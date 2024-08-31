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

  computeProducts() {
    const searched = this.search.run(this.products)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    const sorted = this.sorter.run(priced)
    return sorted
  }

  computePaginatedProducts(sorted) {
    return this.paginator.run(sorted)
  }

  getCaptions() {
    return this.products.map(product => product.caption)
  }

  addProducts(products, currencyRate) {
    products.forEach(product => this.addProduct(product, currencyRate))
  }

  addProduct(product, currencyRate) {
    const createdProduct = new Product(product)
    createdProduct.convertPrice(currencyRate)
    this.products.push(createdProduct)
  }

  checkFavorite(favoritesIds) {
    this.products.forEach(product => {
      if (favoritesIds.includes(product.id)) {
        product.addToFavorites()
      }
    })
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  clear() {
    this.products = []
  }
}

export default Catalog
