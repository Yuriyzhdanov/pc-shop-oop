import modelShop from '../model/model.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'
import viewProduct from '../view/viewProduct.js'

const controller = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.updateCatalog()
    viewFilter.render(modelShop.filter)
    viewPaginator.render(
      modelShop.paginator.getPagesCount(),
      modelShop.paginator.getCurrentPage()
    )
    this.setupEventListeners()
  },
  updateCatalog() {
    const products = modelShop.catalog.computeProducts()
    viewProduct.render(products)
  },
  setupEventListeners() {
    const productsOnDisplaySelect = document.querySelector(
      '.products-on-display'
    )
    productsOnDisplaySelect.addEventListener(
      'change',
      this.handleProductsOnDisplayChange.bind(this)
    )
  },
  handleProductsOnDisplayChange(e) {
    const productsOnPage = parseInt(e.target.value, 10)
    modelShop.paginator.setProductsOnPage(productsOnPage)
    modelShop.paginator.setCurrentPage(0)
    this.updateCatalog()
  },
}

export default controller
