import Product from './Product.class.js'
import api from '../api/api.js'

class Catalog {
  constructor(search, attrSelector, priceRanger, sorter, paginator) {
    this.products = []
    this.search = search
    this.attrSelector = attrSelector
    this.priceRanger = priceRanger
    this.sorter = sorter
    this.paginator = paginator
    this.recommendedProducts = []
    this.similarProducts = []
    this.userId = 3
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

  getFavorites() {
    return this.products.filter(product => product.isFavorite)
  }

  getProductsFromCart() {
    return this.products.filter(product => product.isInCart)
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

  checkProductsInCart(inCartIds) {
    for (const product of this.products) {
      if (inCartIds.includes(product.id)) {
        product.isInCart = true
      }
    }
  }

  computeFavoritesCount() {
    return this.products.reduce((acc, product) => acc + product.isFavorite, 0)
  }
  computeProductInCartCount() {
    return this.products.reduce((acc, product) => acc + product.isInCart, 0)
  }
  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  clear() {
    this.products = []
  }

  async updateRecomendProd() {
    const recommendedIds = await api.loadRecommendedProductsById(this.userId)
    this.recommendedProducts = recommendedIds.map(id =>
      this.products.find(p => p.id === id)
    )
  }

  async updateSimilarProd(id) {
    await this.updateProducts()
    await this.updateCurrencyUSD()
    this.convertPrice()
    const relatedProductIds = await api.loadSimilarProductsById(id)
    this.similarProducts = this.products.filter(product =>
      relatedProductIds.includes(product.id)
    )
  }

  async updateProducts() {
    const productList = await api.loadProducts()
    this.clear()
    this.addProducts(productList, api.getCurrencyRate(), api)
  }

  async updateCurrencyUSD() {
    const currencyRate = await api.getCurrencyRate('USD')
    this.products.forEach(product => product.convertPrice(currencyRate))
  }

  convertPrice() {
    const currencyRate = api.getCurrencyRate()
    this.products.forEach(product => product.convertPrice(currencyRate))
  }
}

export default Catalog
