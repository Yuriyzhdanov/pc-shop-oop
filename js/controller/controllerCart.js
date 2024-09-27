import viewCart from '../view/viewCart.js'
import modelShop from '../model/model.js'

const controllerCart = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCart()
  },

  async handleShowCart() {
    const cartProducts = await modelShop.cart.getProductFromCart()
    console.log(cartProducts)

    viewCart.render(cartProducts)
  },

  async handleAddToCart(productId) {
    await modelShop.cart.addProductToCart(productId)
    viewCart.update(modelShop.cart.products)
  },

  async handleRemoveFromCart(productId) {
    await modelShop.cart.removeProductFromCart(productId)
    viewCart.update(modelShop.cart.products)
  },

  async handleClearCart() {
    await modelShop.cart.clearCart()
    viewCart.render([])
  },
}

export default controllerCart
