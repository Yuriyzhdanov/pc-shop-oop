import modelShop from '../model/model.js'
import viewCatalog from '../view/viewCatalog.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'
import viewSearch from '../view/viewSearch.js'
import viewSort from '../view/viewSort.js'
import viewPriceRanger from '../view/viewPriceRanger.js'

viewPaginator.init()
viewSearch.init()
viewSort.init()
viewPriceRanger.init()

const controller = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    this.handleShowCatalog()
    viewFilter.render(modelShop.filter)
    viewSearch.renderDataList(modelShop.search.getAllPlaceholders())
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
    this.handleShowCatalog()
  },

  handleSearchQuery(query) {
    modelShop.search.setQuery(query)
    this.handleShowCatalog()
  },

  handleSortChange(sortType) {
    modelShop.sorter.setSortingType(sortType)
    modelShop.paginator.setCurrentPage(0)
    this.handleShowCatalog()
  },

  handleUpdatePriceFrom(rangeFrom) {
    console.log(rangeFrom)
    modelShop.priceRanger.setFrom(rangeFrom)
    this.handleShowCatalog()
  },

  handleUpdatePriceTo(rangeTo) {
    modelShop.priceRanger.setTo(rangeTo)
    this.handleShowCatalog()
  },
}

export default controller
