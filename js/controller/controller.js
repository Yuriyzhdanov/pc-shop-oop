import modelShop from '../model/model.js'
import viewCatalog from '../view/viewCatalog.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'

viewPaginator.init()

const controller = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCatalog()
    viewFilter.render(modelShop.filter)
  },

  handleShowCatalog() {
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products)
    viewPaginator.render(
      modelShop.paginator.getPagesCount(),
      modelShop.paginator.getCurrentPage()
    )
  },

  handleChangeProductsOnPage(productsOnPage) {
    modelShop.paginator.setProductsOnPage(productsOnPage)
    this.handleShowCatalog()
  },

  handleClickPage(pageNumber) {
    modelShop.paginator.setCurrentPage(pageNumber)
    console.log('pageNumber', pageNumber)
    this.handleShowCatalog()
  },
}

export default controller
