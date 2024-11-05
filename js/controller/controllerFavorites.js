import modelShop from '../model/model.js'
import viewFavorites from '../view/viewFavorites.js'

const controllerFavorites = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowFavorites()
  },

  handleShowFavorites() {
    const favoriteProducts = modelShop.catalog.getFavorites()
    viewFavorites.render(favoriteProducts)
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
