import modelShop from '../model/model.js'
import viewCatalog from '../view/viewCatalog.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'
import viewPriceRanger from '../view/viewPriceRanger.js'
import viewSearch from '../view/viewSearch.js'
import viewSort from '../view/viewSort.js'

const controller = {
  async handleDOMContentLoaded() {
    viewPaginator.init()
    viewSearch.init()
    viewSort.init()
    viewPriceRanger.init()
    viewFilter.init()
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
    viewCatalog.renderFavoriteCount(modelShop.catalog.computeFavoritesCount())
    viewCatalog.renderCartCount(modelShop.catalog.computeProductInCartCount())
    viewCatalog.renderCompareCount(
      modelShop.catalog.computeProductInCompareCount()
    )
  },

  handleShowCatalog(isResetPrice) {
    const paginatedProducts = modelShop.catalog.computeProducts(isResetPrice)
    viewCatalog.render(paginatedProducts)
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
    this.handleShowCatalog()
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

  async handleFiltrate(attrIds) {
    modelShop.attrSelector.createCheckedAttrs(attrIds)
    modelShop.paginator.setCurrentPage(0)
    this.handleShowCatalog(true)
  },

  handleClearFilter() {
    modelShop.attrSelector.clearCheckedAttrs()
    modelShop.paginator.setCurrentPage(0)
    viewFilter.renderClearFilters()
    this.handleShowCatalog(true)
  },

  async handleToggleFavorite(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const isFavorite = await product.toggleFavorite()
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products, true)
    viewCatalog.renderFavoriteCount(modelShop.catalog.computeFavoritesCount())
  },

  async handleToggleAddToCart(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const isInCart = await product.toggleInCart()
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products, true)
    viewCatalog.renderCartCount(modelShop.catalog.computeProductInCartCount())
  },

  async handleToggleAddToCompare(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const isInCompare = await product.toggleInCompare()
    const products = modelShop.catalog.computeProducts()
    viewCatalog.render(products, true)
    viewCatalog.renderCompareCount(
      modelShop.catalog.computeProductInCompareCount()
    )
  },
}

export default controller
