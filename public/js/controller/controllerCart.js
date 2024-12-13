import viewCart from '../view/viewCart.js'
import modelShop from '../model/model.js'

const controllerCart = {
  async handleDOMContentLoaded() {
    this.showPreloader()
    await modelShop.init()
    this.handleShowCart()
    this.hidePreloader()
  },

  handleShowCart() {
    const cartProducts = modelShop.catalog.getProductsFromCart()
    const totalPrice = modelShop.catalog.computeTotalCartPrice()
    viewCart.render(cartProducts)
    viewCart.renderCartSummary(totalPrice)
  },

  async handleRemoveFromCart(productId) {
    const product = modelShop.catalog.getProductById(productId)
    await product.removeProductFromCart()
    this.handleShowCart()
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
}

export default controllerCart
