import modelShop from '../model/model.js'
import viewFavorites from '../view/viewFavorites.js'

const controllerFavorites = {
  async handleDOMContentLoaded() {
    this.showPreloader()
    await modelShop.init()
    this.handleShowFavorites()
    this.hidePreloader()
  },

  handleShowFavorites() {
    const favoriteProducts = modelShop.catalog.getFavorites()
    viewFavorites.render(favoriteProducts)
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

  async handleToggleFavorite(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const products = modelShop.catalog.computeProducts()
    await product.toggleFavorite()
    this.handleShowFavorites()
  },

  async handleToggleAddToCart(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const products = modelShop.catalog.computeProducts()
    await product.toggleInCart()
    this.handleShowFavorites()
  },

  async handleToggleAddToCompare(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const products = modelShop.catalog.computeProducts()
    await product.toggleInCompare()
    this.handleShowFavorites()
  },
}

export default controllerFavorites
