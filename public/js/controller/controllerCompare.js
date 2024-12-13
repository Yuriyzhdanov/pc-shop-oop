import viewCompare from '../view/viewCompare.js'
import modelShop from '../model/model.js'

const controllerCompare = {
  async handleDOMContentLoaded() {
    this.showPreloader()
    await modelShop.init()
    this.handleShowCompare()
    this.hidePreloader()
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
