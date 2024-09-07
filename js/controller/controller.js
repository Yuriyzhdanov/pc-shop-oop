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
    modelShop.sorter.setSortingType()
    this.handleShowCatalog()
    viewFilter.render(modelShop.filter)
    viewSearch.renderDataList(modelShop.search.getAllPlaceholders())
    viewPaginator.renderOptionsSelected(
      modelShop.paginator.availableProductsOnPage,
      modelShop.paginator.productsOnPage
    )
    viewSort.renderSortingOptions(
      modelShop.sorter.getAvailableSortingTypes(),
      modelShop.sorter.getCurrentSortingType()
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

  handleClickPage(page) {
    modelShop.paginator.setCurrentPage(page)
    this.handleShowCatalog()
  },

  handleSearchQuery(query) {
    modelShop.search.setQuery(query)
    modelShop.paginator.setCurrentPage(0)
    // modelShop.filter.clear()
    const filteredProducts = modelShop.catalog.computeProducts()
    // modelShop.filter.update(sortedProducts)
    // modelShop.priceRanger.resetFromTo()
    this.handleShowCatalog()
    viewFilter.render(modelShop.filter)
  },

  handleSortChange(sortingType) {
    modelShop.sorter.setSortingType(sortingType)
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

  handleFiltrate(attrIds) {
    modelShop.attrSelector.createCheckedAttrs(attrIds)
    modelShop.catalog.computeProducts()
    // modelShop.priceRanger.resetFromTo()
    const filteredProducts = modelShop.catalog.computeProducts()
    modelShop.filter.update(filteredProducts)
    this.handleShowCatalog()
  },

  handleClearFilter() {
    modelShop.attrSelector.clearCheckedAttrs()
    viewFilter.renderClearFilters()
    this.handleShowCatalog()
  },

  async handleToggleFavorite(productId) {
    const product = modelShop.catalog.getProductById(productId)
    await product.toggleFavorite()
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products, true)
    viewCatalog.renderFavoriteCount(modelShop.catalog.computeFavoritesCount())
  },

  async handleFavoriteClick(productId, button) {
    button.disabled = true
    await this.handleToggleFavorite(productId)
    button.disabled = false
  },
}

export default controller
