import controller from '../controller/controllerProduct.js'
import h from './h.js'

const viewProduct = {
  renderProductInfo(product) {
    const productInfo = document.querySelector('.product-info')
    const wrapInfo = this.generateProductInfo(product)
    const leftContainer = document.getElementById('left')
    const slider = this.generateProductSidebar(product)
    leftContainer.innerHTML = ''
    leftContainer.appendChild(slider)
    productInfo.innerHTML = ''
    productInfo.appendChild(wrapInfo)
  },

  renderRecomendProd(recommendedProducts) {
    const container = document.querySelector('.container-pave.recomend')
    container.innerHTML = ''
    recommendedProducts.forEach(product => {
      const productElement = this.generateRecomendProd(product)
      container.appendChild(productElement)
    })
  },

  renderSimilarProd(similarProducts) {
    const container = document.querySelector('.container-pave.similar')
    container.innerHTML = ''
    similarProducts.forEach(product => {
      const productElement = this.generateSimilarProd(product)
      container.appendChild(productElement)
    })
  },

  generateProductInfo(product) {
    const isFavoriteClass = product.isFavorite ? 'favorite-btn' : ''
    const isInCartClass = product.isInCart ? 'cart-btn' : ''
    const isInCompareClass = product.isInCompare ? 'compare-btn' : ''

    const wrapInfo = h(
      'div',
      { class: 'wrap-info wrap-product', 'data-product-id': product.id },
      '',
      [
        h('div', { class: 'caption' }, '', [h('h3', '', product.caption)]),
        this.generateRating(),
        h('div', { class: 'wrap-info-price' }, '', [
          h('div', { class: 'price' }, '', [
            h('p', '', `${product.convertedPrice.toFixed(0)} грн`),
          ]),
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
          h('div', { class: 'compare' }, '', [
            h(
              'button',
              { class: isInCompareClass },
              '',
              [],
              this.onClickButtonCompare
            ),
          ]),
        ]),
      ]
    )

    return wrapInfo
  },

  generateRecomendProd(product) {
    const tile = document.createElement('div')
    const recomendDiv = document.createElement('div')
    const link = document.createElement('a')
    const img = document.createElement('img')
    const caption = document.createElement('p')
    tile.classList.add('tile')
    recomendDiv.classList.add('recomend')
    link.setAttribute('href', `./product.html?id=${product.id}`)
    link.setAttribute('target', '_blank')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
    img.alt = product.caption
    caption.textContent = product.caption
    link.appendChild(img)
    recomendDiv.appendChild(link)
    recomendDiv.appendChild(caption)
    tile.appendChild(recomendDiv)

    return tile
  },

  generateSimilarProd(product) {
    const tile = document.createElement('div')
    const similarDiv = document.createElement('div')
    const link = document.createElement('a')
    const img = document.createElement('img')
    const caption = document.createElement('p')
    tile.classList.add('tile')
    similarDiv.classList.add('similar')
    link.setAttribute('href', `./product.html?id=${product.id}`)
    link.setAttribute('target', '_blank')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
    img.alt = product.caption
    caption.textContent = product.caption
    link.appendChild(img)
    similarDiv.appendChild(link)
    similarDiv.appendChild(caption)
    tile.appendChild(similarDiv)

    return tile
  },

  generateRating() {
    const wrapDiv = document.createElement('div')
    wrapDiv.classList.add('wrap-rating')
    const ratingDiv = document.createElement('div')
    for (let i = 0; i <= 5; i++) {
      const radioInput = document.createElement('input')
      radioInput.setAttribute('type', 'radio')
      radioInput.setAttribute('name', 'rating')
      radioInput.setAttribute('id', 'r' + i)
      if (i === 0) {
        radioInput.setAttribute('checked', 'checked')
      }
      wrapDiv.appendChild(radioInput)
    }
    ratingDiv.classList.add('rating')
    for (let i = 1; i <= 5; i++) {
      const label = document.createElement('label')
      label.setAttribute('for', 'r' + i)
      ratingDiv.appendChild(label)
    }
    wrapDiv.appendChild(ratingDiv)
    return wrapDiv
  },

  generateProductSidebar(product) {
    const slider = document.createElement('div')
    const navigation = this.generateNavigation(product, slider)
    const specsContainer = this.generateSpecsContainer(product)
    slider.classList.add('slider')
    slider.appendChild(navigation)
    slider.appendChild(specsContainer)
    return slider
  },

  generateNavigation(product, slider) {
    const navigation = document.createElement('div')
    navigation.classList.add('navigation')
    product.photos.forEach((file, index) => {
      const input = document.createElement('input')
      const label = this.generateLabel(file, index, product)
      input.type = 'radio'
      input.name = 'r'
      input.id = `slider-r${index + 1}`
      if (index === 0) {
        input.checked = true
      }
      navigation.appendChild(label)
      slider.appendChild(input)
    })
    return navigation
  },

  generateLabel(file, index, product) {
    const label = document.createElement('label')
    const img = document.createElement('img')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${file}`
    img.alt = `img${index + 1}`
    const idx = index + 2 > product.photos.length ? 1 : index + 2
    label.htmlFor = `slider-r${idx}`
    label.appendChild(img)
    return label
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

  async onClickButtonFavorite(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    // elButton.disabled = true
    await controller.handleToggleFavorite(productId)
    // elButton.disabled = false
  },

  async onClickButtonCart(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    // elButton.disabled = true
    await controller.handleToggleAddToCart(productId)
    // elButton.disabled = false
  },

  async onClickButtonCompare(e) {
    const elButton = e.target
    const productId = +elButton
      .closest('.wrap-product')
      .getAttribute('data-product-id')
    // elButton.disabled = true
    await controller.handleToggleAddToCompare(productId)
    // elButton.disabled = false
  },
}

export default viewProduct
