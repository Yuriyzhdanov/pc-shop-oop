import modelShop from '../model/model.js'
import viewCatalog from '../view/viewCatalog.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'
import viewPriceRanger from '../view/viewPriceRanger.js'
import viewSearch from '../view/viewSearch.js'
import viewSort from '../view/viewSort.js'

viewPaginator.init()
viewSearch.init()
viewSort.init()
viewPriceRanger.init()
viewFilter.init()

const controller = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    modelShop.sorter.setSortingType('byPriceASC')
    this.handleShowCatalog()
    viewFilter.render(modelShop.filter)
    viewSearch.renderDataList(modelShop.search.getAllPlaceholders())
    viewPaginator.renderOptionsSelected(
      modelShop.paginator.availableProductsOnPage,
      modelShop.paginator.productsOnPage
    )
  },

  handleShowCatalog() {
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products)
    viewPaginator.render(
      modelShop.paginator.getPagesCount(),
      modelShop.paginator.getCurrentPage()
    )
    viewPriceRanger.render(
      modelShop.priceRanger.min,
      modelShop.priceRanger.max,
      modelShop.priceRanger.from,
      modelShop.priceRanger.to
    )
  },

  handleChangeProductsOnPage(productsOnPage) {
    modelShop.paginator.setProductsOnPage(productsOnPage)
    modelShop.paginator.setCurrentPage(0)
    this.handleShowCatalog()
  },

  handleClickPage(pageNumber) {
    modelShop.paginator.setCurrentPage(pageNumber)
    this.handleShowCatalog()
  },

  handleClearSearch() {
    modelShop.search.setQuery('')
    console.log('handleClearSearch')
    this.handleShowCatalog()
  },

  handleSearchQuery(query) {
    console.log(query)
    modelShop.search.setQuery(query)
    modelShop.paginator.setCurrentPage(0)
    // modelShop.priceRanger.calcMinMax(attributed) // ?? ??
    this.handleShowCatalog()
    modelShop.priceRanger.resetFromTo()
    viewPriceRanger.render(
      modelShop.priceRanger.min,
      modelShop.priceRanger.max,
      modelShop.priceRanger.from,
      modelShop.priceRanger.to
    )
  },

  handleSortChange(sortType) {
    modelShop.sorter.setSortingType(sortType)
    this.handleShowCatalog()
  },

  handleUpdatePriceFrom(rangeFrom) {
    modelShop.priceRanger.setFrom(rangeFrom)
    modelShop.paginator.setCurrentPage(0)
    this.handleShowCatalog()
  },

  handleUpdatePriceTo(rangeTo) {
    modelShop.priceRanger.setTo(rangeTo)
    modelShop.paginator.setCurrentPage(0)
    this.handleShowCatalog()
  },

  handleFiltrate() {
    console.log('handelFiltrate')
    const checkedCheckboxes = document.querySelectorAll(
      '.wrap-checkbox input:checked'
    )
    const checkedAttrs = []
    checkedCheckboxes.forEach(checkbox => {
      checkedAttrs.push(checkbox.id)
    })
    const filteredProducts = modelShop.attrSelector.run(
      modelShop.catalog.products
    )
    viewCatalog.render(filteredProducts)
    viewPaginator.render(
      modelShop.paginator.getPagesCount(),
      modelShop.paginator.getCurrentPage()
    )
  },
}

export default controller
