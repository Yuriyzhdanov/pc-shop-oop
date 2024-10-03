import viewCompare from '../view/viewCompare.js'
import modelShop from '../model/model.js'

const controllerCompare = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCompare()
  },

  handleShowCompare() {
    const compareProducts = modelShop.catalog.getCompareProducts()
    viewCompare.render(compareProducts)
  },

  async handleRemoveFromCompare(productId) {
    const product = modelShop.catalog.getProductById(productId)
    await product.removeProductFromCompare()
    this.handleShowCompare()
  },
}

export default controllerCompare
