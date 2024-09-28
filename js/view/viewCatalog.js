import controller from '../controller/controllerCatalog.js'
import h from './h.js'

let tempObjsImg = []

const viewCatalog = {
  selector: '.container-products',

  generateNotFoundMessage() {
    const elDiv = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.textContent = 'Данный товар по запросу не найден'
    elDiv.appendChild(elSpan)
    elDiv.className = 'not-found-message'
    return elDiv
  },

  renderNotFoundMessage() {
    const elMessageNotFount = this.generateNotFoundMessage()
    const elContainer = document.querySelector(this.selector)
    elContainer.appendChild(elMessageNotFount)
  },

  render(products, fromChache = false) {
    const elContainerProduct = document.querySelector(this.selector)
    elContainerProduct.innerHTML = ''

    if (!fromChache) tempObjsImg = []

    if (products.length === 0) {
      this.renderNotFoundMessage()
      return
    }
    products.forEach((product, idx) => {
      const elTile = this.generate(product, idx, fromChache)
      elContainerProduct.appendChild(elTile)
    })
  },

  generate(product, idx, fromChache) {
    const divLabels = this.generateLabelSpecs(product.attributes)
    const isFavoriteClass = product.isFavorite ? 'favorite-btn' : ''
    const isInCartClass = product.isInCart ? 'cart-btn' : ''

    const divContainterProduct = h(
      'div',
      { class: 'wrap-product', 'data-product-id': product.id },
      '',
      [
        h('div', { class: 'wrap-a' }, '', [
          h(
            'a',
            {
              href: `./product.html?id=${product.id}`,
              target: '_blank',
              class: 'a-link',
            },
            '',
            [
              h('div', { class: 'wrap-img' }, '', [
                fromChache
                  ? tempObjsImg[idx]
                  : tempObjsImg.push(
                      h('img', {
                        src: `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`,
                        alt: product.caption,
                      })
                    ) && tempObjsImg.at(-1),
              ]),
              h('div', { class: 'wrap-h3' }, '', [
                h('h3', '', product.caption),
              ]),
            ]
          ),
        ]),
        divLabels,
        h('div', { class: 'wrap-p' }, '', [
          h('p', {}, '', [h('b', {}, product.convertedPrice + ' грн')]),
        ]),
        h('div', { class: 'row' }, '', [
          h('div', { class: 'cart' }, '', [
            h(
              'button',
              { class: isInCartClass },
              '',
              [],
              this.onClickButtonCart
            ),
          ]),
          h('div', { class: 'favorite' }, '', [
            h(
              'button',
              { class: isFavoriteClass },
              '',
              [],
              this.onClickButtonFavorite
            ),
          ]),
          h('div', { class: 'compare' }, '', [h('button', {})]),
        ]),
        h('div', { class: Math.random() < 0.5 ? 'new_' : '' }),
      ]
    )

    return divContainterProduct
  },

  async onClickButtonFavorite(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    elButton.disabled = true
    await controller.handleToggleFavorite(productId)
    elButton.disabled = false
  },

  async onClickButtonCart(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    elButton.disabled = true
    await controller.handleToggleAddToCart(productId)
    elButton.disabled = false
  },

  generateLabelSpecs(specs) {
    const divLabels = document.createElement('div')
    let i = 0
    for (const key in specs) {
      const value = specs[key]
      i++
      const labelValue = `${key}-${value}`
      const label = document.createElement('label')
      label.textContent = value
      label.htmlFor = labelValue
      divLabels.appendChild(label)
      if (i > 8) {
        return divLabels
      }
    }
    return divLabels
  },

  renderFavoriteCount(count) {
    const elCount = document.querySelector('.center > span')
    elCount.textContent = count
  },

  renderCartCount(count) {
    const elCount = document.querySelector('.left > span')
    elCount.textContent = count
  },
}

window.viewCatalog = viewCatalog

export default viewCatalog
