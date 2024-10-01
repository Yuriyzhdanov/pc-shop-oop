import viewComparison from '../view/viewCompare.js'
import modelShop from '../model/model.js'

const controllerCompare = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCompare()
  },

  handleShowCompare() {
    const compareProducts = modelShop.catalog.getCompareProducts()
    console.log(compareProducts)

    viewComparison.render(compareProducts)
  },

  async handleRemoveFromCompare(productId) {
    const product = modelShop.catalog.getProductById(productId)
    await product.removeFromCompare()
    this.handleShowCompare()
  },
}

export default controllerCompare
