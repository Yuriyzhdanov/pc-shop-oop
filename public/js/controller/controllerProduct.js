import viewProduct from '../view/viewProduct.js'
import modelShop from '../model/model.js'

const controllerProduct = {
  async handleDOMContentLoaded() {
    this.showPreloader()
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    await modelShop.init()
    const product = modelShop.catalog.products.find(p => p.id === +productId)
    this.handleShowProduct(product)
    this.handleShowRecommendedProducts()
    this.handleShowSimilarProducts(productId)
    this.handleShowWatchedProducts(productId)
    this.hidePreloader()
  },

  handleShowProduct(product) {
    viewProduct.renderProductInfo(product)
  },
  showPreloader() {
    const preloader = document.getElementById('preloader')
    if (preloader) {
      preloader.style.display = 'block'
    }
  },

  hidePreloader() {
    const preloader = document.getElementById('preloader')
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('cansel')
      }, 499)
    }
  },

  async handleShowRecommendedProducts() {
    await modelShop.catalog.updateRecomendProd()
    viewProduct.renderRecomendProd(modelShop.catalog.recommendedProducts)
  },

  async handleShowSimilarProducts(productId) {
    await modelShop.catalog.updateSimilarProd(productId)
    viewProduct.renderSimilarProd(modelShop.catalog.similarProducts)
  },

  async handleShowWatchedProducts(productId) {
    await modelShop.catalog.updateWatchedProd(productId)
    viewProduct.renderWatchedProd(modelShop.catalog.watchedProducts)
  },

  async handleToggleFavorite(productId) {
    console.log(productId)

    const product = modelShop.catalog.getProductById(productId)
    const products = modelShop.catalog.computeProducts()
    await product.toggleFavorite()
    this.handleShowProduct(product)
  },

  async handleToggleAddToCart(productId) {
    const product = modelShop.catalog.getProductById(productId)
    console.log(product)
    const products = modelShop.catalog.computeProducts()
    await product.toggleInCart()
    this.handleShowProduct(product)
  },

  async handleToggleAddToCompare(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const products = modelShop.catalog.computeProducts()
    await product.toggleInCompare()
    this.handleShowProduct(product)
  },
}

export default controllerProduct
