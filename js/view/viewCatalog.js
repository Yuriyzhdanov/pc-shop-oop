import controller from '../controller/controller.js'
import h from './h.js'

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

  render(products) {
    const elContainerProduct = document.querySelector(this.selector)
    elContainerProduct.innerHTML = ''
    if (products.length === 0) {
      this.renderNotFoundMessage()
    }
    products.forEach(product => {
      const elTile = this.generate(product)
      elContainerProduct.appendChild(elTile)
    })
  },

  generate(product) {
    const divLabels = this.generateLabelSpecs(product.attributes)
    const isFavoriteClass = product.isFavorite ? 'favorite-btn' : ''
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
                h('img', {
                  src: `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`,
                  alt: product.caption,
                }),
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
          h('div', { class: 'cart' }, '', [h('button', {})]),
          h('div', { class: 'favorite' }, '', [
            h('button', { isFavoriteClass }, '', [], () =>
              this.onClickFavorite(product.id)
            ),
          ]),
          h('div', { class: 'compare' }, '', [h('button', {})]),
        ]),
        h('div', { class: Math.random() < 0.5 ? 'new_' : '' }),
      ]
    )
    return divContainterProduct
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

  onClickFavorite(productId) {
    controller.handleFavorite(productId)
  },

  updateFavoriteButton(productId, isFavorite) {
    const favoriteButton = document.querySelector(
      `[data-product-id="${productId}"] .favorite button`
    )
    if (isFavorite) {
      favoriteButton.classList.add('favorite-btn')
    } else {
      favoriteButton.classList.remove('favorite-btn')
    }
  },

  updateFavoriteCount(count) {
    const elCount = document.querySelector('.center > span')
    elCount.textContent = count
  },
}

window.viewCatalog = viewCatalog

export default viewCatalog
