import viewCart from '../view/viewCart.js'
import modelShop from '../model/model.js'

const controllerCart = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCart()
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
}

export default controllerCart
