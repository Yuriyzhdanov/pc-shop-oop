import controllerCompare from '../controller/controllerCompare.js'

const viewCompare = {
  selectorSpecsComparison: '.specs-table',

  render(products) {
    const elContainerSpecs = document.querySelector(
      this.selectorSpecsComparison
    )
    elContainerSpecs.innerHTML = ''
    const specsTable = this.generateSpecsTable(products)

    if (specsTable) {
      elContainerSpecs.appendChild(specsTable)
    } else {
      this.renderNotFoundMessage()
    }
  },

  generateNotFoundMessage() {
    const elDiv = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.textContent = 'Товары для сравнения еще не добавлены'
    elDiv.appendChild(elSpan)
    elDiv.className = 'not-found-message'
    return elDiv
  },

  renderNotFoundMessage() {
    const elMessageNotFound = this.generateNotFoundMessage()
    const elContainer = document.querySelector(this.selectorSpecsComparison)
    elContainer.appendChild(elMessageNotFound)
  },

  generateSpecsTable(products) {
    if (!products || products.length === 0) {
      return null
    }
    const fragment = document.createDocumentFragment()
    const specsKeys = {}
    products.forEach(product => {
      for (const spec in product.attributes) {
        specsKeys[spec] = true
      }
    })

    const uniqueSpecs = Object.keys(specsKeys)
    const table = document.createElement('table')

    const buttonRow = document.createElement('tr')
    const buttonCell = document.createElement('td')
    buttonCell.textContent = 'Действие'
    buttonRow.appendChild(buttonCell)

    products.forEach((product, index) => {
      const button = document.createElement('button')
      button.textContent = 'Удалить'
      button.classList.add('button-remove-prod')
      button.setAttribute('data-product-id', product.id)
      button.addEventListener('click', async e => {
        const columnToRemove = table.querySelectorAll(
          `td[data-column-index="${index}"], th[data-column-index="${index}"]`
        )
        columnToRemove.forEach(cell => cell.remove())
        await this.onClickButtonRemoveCompareProd(e)
      })

      const buttonCell = document.createElement('td')
      buttonCell.appendChild(button)
      buttonCell.setAttribute('data-column-index', index)
      buttonRow.appendChild(buttonCell)
    })
    fragment.appendChild(buttonRow)

    const headerRow = document.createElement('tr')
    const th = document.createElement('th')
    th.textContent = 'Название'
    headerRow.appendChild(th)
    products.forEach((product, index) => {
      const thProd = document.createElement('th')
      thProd.textContent = product.caption
      thProd.setAttribute('data-column-index', index)
      headerRow.appendChild(thProd)
    })
    fragment.appendChild(headerRow)

    const imageRow = document.createElement('tr')
    const imgCell = document.createElement('td')
    imgCell.textContent = ''
    imageRow.appendChild(imgCell)
    products.forEach((product, index) => {
      const img = document.createElement('img')
      img.src = `https://web-app.click/pc-shop/photos/products/computers/${product.photos[0]}`
      img.alt = product.caption
      const imgCell = document.createElement('td')
      imgCell.appendChild(img)
      imgCell.setAttribute('data-column-index', index)
      imageRow.appendChild(imgCell)
    })
    fragment.appendChild(imageRow)

    const priceRow = document.createElement('tr')
    const priceCell = document.createElement('td')
    priceCell.textContent = 'Цена'
    priceRow.appendChild(priceCell)
    products.forEach((product, index) => {
      const priceCell = document.createElement('td')
      priceCell.textContent = `${product.convertedPrice} грн`
      priceCell.setAttribute('data-column-index', index)
      priceRow.appendChild(priceCell)
    })
    fragment.appendChild(priceRow)

    const emptyRow = document.createElement('tr')
    const emptyCell = document.createElement('td')
    emptyCell.colSpan = products.length + 1
    emptyRow.appendChild(emptyCell)
    fragment.appendChild(emptyRow)

    uniqueSpecs.forEach(spec => {
      const tr = document.createElement('tr')
      const tdSpec = document.createElement('td')
      tdSpec.textContent = spec
      tr.appendChild(tdSpec)

      products.forEach((product, index) => {
        const tdValue = document.createElement('td')
        tdValue.textContent = product.attributes[spec] || '**'
        tdValue.setAttribute('data-column-index', index)
        tr.appendChild(tdValue)
      })
      fragment.appendChild(tr)
    })
    table.appendChild(fragment)
    return table
  },

  async onClickButtonRemoveCompareProd(e) {
    const elButton = e.target
    const productId = +elButton.getAttribute('data-product-id')
    elButton.disabled = true
    await controllerCompare.handleRemoveFromCompare(productId)
    elButton.disabled = false
  },
}

window.viewComparison = viewCompare
export default viewCompare
