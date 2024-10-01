const viewComparison = {
  selectorProdComparison: '.comparison-table',
  selectorSpecsComparison: '.specs-table',

  render(products) {
    const elContainerProd = document.querySelector(this.selectorProdComparison)
    const elContainerSpecs = document.querySelector(
      this.selectorSpecsComparison
    )

    elContainerProd.innerHTML = ''

    products.forEach(product => {
      const generateProductRow = this.generateProductRow(product)
      elContainerProd.appendChild(generateProductRow)
    })

    const generateSpecsTable = this.generateSpecsTable(products)
    elContainerSpecs.appendChild(generateSpecsTable)
  },

  generateProductRow(product) {
    const tr = document.createElement('tr')

    const tdImage = document.createElement('td')
    const img = document.createElement('img')
    img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
    img.alt = product.caption
    img.style.width = '100px'
    img.style.height = 'auto'
    tdImage.appendChild(img)
    tr.appendChild(tdImage)

    const tdName = document.createElement('td')
    const divName = document.createElement('div')
    divName.classList.add('product-name')
    divName.textContent = product.caption
    tdName.appendChild(divName)
    tr.appendChild(tdName)

    const tdPrice = document.createElement('td')
    tdPrice.textContent = `${product.convertedPrice}₴`
    tr.appendChild(tdPrice)

    const tdButton = document.createElement('td')
    const button = document.createElement('button')
    button.textContent = 'Удалить'
    button.classList.add('button-remove-prod')

    button.addEventListener('click', () => {
      console.log(`Кнопка нажата`)
    })

    tdButton.appendChild(button)
    tr.appendChild(tdButton)

    return tr
  },

  generateSpecsTable(products) {
    const fragment = document.createDocumentFragment()

    const specsKeys = {}

    products.forEach(product => {
      for (const spec in product.attributes) {
        specsKeys[spec] = true
      }
    })

    const uniqueSpecs = Object.keys(specsKeys)

    const headerRow = document.createElement('tr')
    const th = document.createElement('th')
    th.textContent = 'Характеристика'
    headerRow.appendChild(th)

    products.forEach(product => {
      const thProd = document.createElement('th')
      thProd.textContent = product.caption
      headerRow.appendChild(thProd)
    })

    fragment.appendChild(headerRow)

    uniqueSpecs.forEach(spec => {
      const tr = document.createElement('tr')

      const tdSpec = document.createElement('td')
      tdSpec.textContent = spec
      tr.appendChild(tdSpec)

      products.forEach(product => {
        const tdValue = document.createElement('td')
        tdValue.textContent = product.attributes[spec] || '**'
        tr.appendChild(tdValue)
      })

      fragment.appendChild(tr)
    })

    return fragment
  },
}

window.viewComparison = viewComparison
export default viewComparison
