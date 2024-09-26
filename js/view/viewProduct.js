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
    const wrapInfo = document.createElement('div')
    const caption = document.createElement('div')
    const h3 = document.createElement('h3')
    const rating = this.generateRating()
    const wrapInfoButtons = document.createElement('div')
    const buttons = document.createElement('div')
    const btnFavorite = document.createElement('button')
    const btnCompare = document.createElement('button')
    const wrapInfoPrice = document.createElement('div')
    const price = document.createElement('div')
    const priceParagraph = document.createElement('p')
    const wrapInfoCart = document.createElement('div')
    const cartButton = document.createElement('div')
    const btnCart = document.createElement('button')
    wrapInfo.classList.add('wrap-info')
    caption.classList.add('caption')
    wrapInfoButtons.classList.add('wrap-info-buttons')
    buttons.classList.add('buttons')
    btnFavorite.classList.add('btn')
    btnCompare.classList.add('btn')
    wrapInfoPrice.classList.add('wrap-info-price')
    price.classList.add('price')
    wrapInfoCart.classList.add('wrap-info-cart')
    cartButton.classList.add('cart-button')
    btnCart.classList.add('btn')
    h3.textContent = product.caption
    btnFavorite.textContent = 'В избранное'
    btnCompare.textContent = 'Сравнить'
    btnCart.textContent = 'В корзину'
    priceParagraph.textContent = `${product.convertedPrice.toFixed(0)} грн`
    caption.appendChild(h3)
    wrapInfo.appendChild(caption)
    wrapInfo.appendChild(rating)
    buttons.appendChild(btnFavorite)
    buttons.appendChild(btnCompare)
    wrapInfoButtons.appendChild(buttons)
    wrapInfo.appendChild(wrapInfoButtons)
    price.appendChild(priceParagraph)
    wrapInfoPrice.appendChild(price)
    wrapInfo.appendChild(wrapInfoPrice)
    cartButton.appendChild(btnCart)
    wrapInfoCart.appendChild(cartButton)
    wrapInfo.appendChild(wrapInfoCart)

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
}

export default viewProduct
