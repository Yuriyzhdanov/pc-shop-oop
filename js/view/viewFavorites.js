import controllerFavorites from '../controller/controllerFavorites.js'
import h from './h.js'

let tempObjsImgFavorites = []

const viewFavorites = {
  selector: '.container-products',

  generateNotFoundMessage() {
    const elDiv = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.textContent = 'Избранные товары еще не добавлены'
    elDiv.appendChild(elSpan)
    elDiv.className = 'not-found-message'
    return elDiv
  },

  renderNotFoundMessage() {
    const elMessageNotFound = this.generateNotFoundMessage()
    const elContainer = document.querySelector(this.selector)
    elContainer.appendChild(elMessageNotFound)
  },

  render(products, fromCache = false) {
    const elContainerFavorites = document.querySelector(this.selector)
    elContainerFavorites.innerHTML = ''
    if (!fromCache) tempObjsImgFavorites = []
    if (products.length === 0) {
      this.renderNotFoundMessage()
      return
    }
    products.forEach((product, idx) => {
      const elTile = this.generate(product, idx, fromCache)
      elContainerFavorites.appendChild(elTile)
    })
  },

  generate(product, idx, fromCache) {
    const divLabels = this.generateLabelSpecs(product.attributes)
    const divContainerProduct = h(
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
                fromCache
                  ? tempObjsImgFavorites[idx]
                  : tempObjsImgFavorites.push(
                      h('img', {
                        src: `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`,
                        alt: product.caption,
                      })
                    ) && tempObjsImgFavorites.at(-1),
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
          h('div', { class: 'delete' }, '', [
            h(
              'button',
              { class: 'remove-favorite-btn' },
              '',
              [],
              this.onClickButtonRemoveFavorite.bind(this)
            ),
          ]),
          h('div', { class: 'compare' }, '', [h('button', {})]),
        ]),
      ]
    )

    return divContainerProduct
  },

  async onClickButtonRemoveFavorite(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    elButton.disabled = true
    await controllerFavorites.handleRemoveFromFavorite(productId)
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
}

export default viewFavorites
