import controllerCart from '../controller/controllerCart.js'

const viewCart = {
  selectorCartProd: '.cart-products',
  selectorSummary: '.cart-summary',

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
    const leftDiv = document.createElement('div')
    const img = document.createElement('img')
    const centerDiv = document.createElement('div')
    const elCaptionProduct = document.createElement('p')
    const elPrice = document.createElement('p')
    const specsContainer = this.generateSpecsContainer(product)
    const rightDiv = document.createElement('div')
    const removeButton = document.createElement('button')

    cartItem.setAttribute('data-product-id', product.id)
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
    img.alt = 'Product image'
    elCaptionProduct.textContent = product.caption
    elPrice.innerHTML = `Цена: <span>${product.convertedPrice}</span> грн`
    removeButton.textContent = 'Удалить'

    cartItem.classList.add('cart-item', 'row')
    leftDiv.classList.add('left')
    img.classList.add('cart-item-img')
    centerDiv.classList.add('center')
    elCaptionProduct.classList.add('cart-item-name')
    elPrice.classList.add('cart-item-price')
    rightDiv.classList.add('right')
    removeButton.classList.add('btn', 'remove-from-cart')

    removeButton.addEventListener(
      'click',
      this.onClickButtonRemoveFromCart.bind(this)
    )

    leftDiv.appendChild(img)
    cartItem.appendChild(leftDiv)
    centerDiv.appendChild(elCaptionProduct)
    centerDiv.appendChild(elPrice)
    centerDiv.appendChild(specsContainer)
    cartItem.appendChild(centerDiv)
    rightDiv.appendChild(removeButton)
    cartItem.appendChild(rightDiv)

    return cartItem
  },

  generateCartSummary(totalPrice) {
    const elDiv = document.createElement('div')
    const elTitle = document.createElement('h3')
    const elTotalPrice = document.createElement('p')
    const elButtonCheckout = document.createElement('button')

    elDiv.className = 'cart-summary-container'
    elTotalPrice.className = 'total-price'
    elTitle.textContent = 'Итого'
    elTotalPrice.innerHTML = `Общая сумма: <span><strong>${totalPrice}</strong></span> грн`

    elButtonCheckout.className = 'btn checkout-btn'
    elButtonCheckout.textContent = 'Оформить заказ'
    elButtonCheckout.addEventListener('click', this.onClickCheckout.bind(this))

    elDiv.appendChild(elTitle)
    elDiv.appendChild(elTotalPrice)
    elDiv.appendChild(elButtonCheckout)

    return elDiv
  },

  generateSpecsContainer(product) {
    const specsContainer = document.createElement('div')
    specsContainer.classList.add('specs')
    Object.entries(product.attributes).forEach(([spec, prop]) => {
      const elP = document.createElement('p')
      const span = document.createElement('span')
      elP.innerHTML = `${spec}: `
      span.textContent = prop
      elP.appendChild(span)
      specsContainer.appendChild(elP)
    })
    return specsContainer
  },

  onClickCheckout() {
    console.log('заказ оформлен ')
  },

  async onClickButtonRemoveFromCart(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.cart-item')
      .getAttribute('data-product-id')
    elButton.disabled = true
    await controllerCart.handleRemoveFromCart(productId)
    elButton.disabled = false
  },
}

window.viewCart = viewCart

export default viewCart
