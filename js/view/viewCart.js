import controller from '../controller/controllerCart.js'

const viewCart = {
  selectorCartProd: '.cart-products',
  selectorSummary: '.cart-summary-container',

  render(products) {
    const elContainer = document.querySelector(this.selectorCartProd)
    elContainer.innerHTML = ''
    if (products.length === 0) {
      const emptyMessage = document.createElement('p')
      emptyMessage.textContent = 'Ваша корзина пуста'
      elContainer.appendChild(emptyMessage)
      return
    }
    products.forEach(product => {
      const cartItemElement = this.generateCartItem(product)
      elContainer.appendChild(cartItemElement)
    })
  },

  renderCartSummary(totalPrice) {
    const elContainer = document.querySelector(this.selectorSummary)
    elContainer.innerHTML = ''
    const elCartSummary = this.generateCartSummary(totalPrice)
    elContainer.appendChild(elCartSummary)
  },

  generateCartItem(product) {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item', 'row')
    const leftDiv = document.createElement('div')
    leftDiv.classList.add('left')
    const img = document.createElement('img')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photo}`
    img.alt = 'Product Image'
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
    priceParagraph.innerHTML = `Цена: <span>${product.price}</span> грн`

    const quantityDiv = document.createElement('div')
    quantityDiv.classList.add('cart-item-quantity')

    const quantityLabel = document.createElement('label')
    quantityLabel.setAttribute('for', 'quantity')
    quantityLabel.textContent = 'Количество:'

    const quantityInput = document.createElement('input')
    quantityInput.type = 'number'
    quantityInput.id = 'quantity'
    quantityInput.name = 'quantity'
    quantityInput.value = product.quantity
    quantityInput.min = '1'

    quantityDiv.appendChild(quantityLabel)
    quantityDiv.appendChild(quantityInput)

    centerDiv.appendChild(nameParagraph)
    centerDiv.appendChild(priceParagraph)
    centerDiv.appendChild(quantityDiv)
    cartItem.appendChild(centerDiv)

    const rightDiv = document.createElement('div')
    rightDiv.classList.add('right')

    const removeButton = document.createElement('button')
    removeButton.classList.add('btn', 'remove-from-cart')
    removeButton.textContent = 'Удалить'
    removeButton.addEventListener('click', () =>
      this.onRemoveFromCart(product.id)
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
  onRemoveFromCart(productId) {
    controller.handleRemoveFromCart(productId)
    console.log(`Удалить товар: ${productId}`)
  },
}

window.viewCart = viewCart

export default viewCart
