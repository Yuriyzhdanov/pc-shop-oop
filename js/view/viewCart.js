import controllerCart from '../controller/controllerCart.js'
import h from './h.js'

const viewCart = {
  selectorCartProd: '.cart-products',
  selectorSummary: '.cart-summary-container',

  generateNotFoundMessageCart() {
    const elDiv = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.textContent = 'Ваша корзина пуста'
    elDiv.appendChild(elSpan)
    elDiv.className = 'not-found-message-cart'
    return elDiv
  },

  renderNotFoundMessageCart() {
    const elMessageNotFound = this.generateNotFoundMessageCart()
    const elContainer = document.querySelector(this.selectorCartProd)
    elContainer.appendChild(elMessageNotFound)
  },

  renderCartSummary(totalPrice) {
    const elContainer = document.querySelector(this.selectorSummary)
    elContainer.innerHTML = ''
    const elCartSummary = this.generateCartSummary(totalPrice)
    elContainer.appendChild(elCartSummary)
  },

  render(products) {
    const elContainerCart = document.querySelector(this.selectorCartProd)
    elContainerCart.innerHTML = ''
    if (products.length === 0) {
      this.renderNotFoundMessageCart()
      return
    }
    products.forEach(product => {
      const cartItemElement = this.generateCartItem(product)
      elContainerCart.appendChild(cartItemElement)
    })
  },

  generateCartItem(product) {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item', 'row')
    cartItem.setAttribute('data-product-id', product.id)
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('left')
    const img = document.createElement('img')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
    img.alt = 'Product image'
    img.classList.add('cart-item-img')

    leftDiv.appendChild(img)
    cartItem.appendChild(leftDiv)

    const centerDiv = document.createElement('div')
    centerDiv.classList.add('center')

    const nameParagraph = document.createElement('p')
    nameParagraph.classList.add('cart-item-name')
    nameParagraph.textContent = product.name

    const priceParagraph = document.createElement('p')
    priceParagraph.classList.add('cart-item-price')
    priceParagraph.innerHTML = `Цена: <span>${product.convertedPrice}</span> грн`

    centerDiv.appendChild(nameParagraph)
    centerDiv.appendChild(priceParagraph)
    cartItem.appendChild(centerDiv)

    const rightDiv = document.createElement('div')
    rightDiv.classList.add('right')

    const removeButton = document.createElement('button')
    removeButton.classList.add('btn', 'remove-from-cart')
    removeButton.textContent = 'Удалить'
    removeButton.addEventListener(
      'click',
      this.onClickButtonRemoveFromCart.bind(this)
    )

    rightDiv.appendChild(removeButton)
    cartItem.appendChild(rightDiv)

    return cartItem
  },

  generateCartSummary(totalPrice) {
    const elDiv = document.createElement('div')
    elDiv.className = 'cart-summary'
    const elTitle = document.createElement('h3')
    elTitle.textContent = 'Итого'
    elDiv.appendChild(elTitle)
    const elTotalPrice = document.createElement('p')
    elTotalPrice.className = 'total-price'
    elTotalPrice.innerHTML = `Общая сумма: <span>${totalPrice}</span> грн`
    elDiv.appendChild(elTotalPrice)

    const elButtonCheckout = document.createElement('button')
    elButtonCheckout.className = 'btn checkout-btn'
    elButtonCheckout.textContent = 'Оформить заказ'
    elButtonCheckout.addEventListener('click', this.onClickCheckout.bind(this))

    elDiv.appendChild(elButtonCheckout)

    return elDiv
  },

  onClickCheckout() {
    console.log('заказ оформлен ')
  },

  async onClickButtonRemoveFromCart(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.cart-item')
      .getAttribute('data-product-id')
    console.log(productId)

    elButton.disabled = true
    await controllerCart.handleRemoveFromCart(productId)
    elButton.disabled = false
  },
}

window.viewCart = viewCart

export default viewCart
