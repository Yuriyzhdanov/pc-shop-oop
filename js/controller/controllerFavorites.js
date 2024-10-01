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

  async handleRemoveFromFavorite(productId) {
    const product = modelShop.catalog.getProductById(productId)
    await product.removeFromFavorites()
    this.handleShowFavorites()
  },
}

export default controllerFavorites
