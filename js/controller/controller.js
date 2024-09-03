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
    modelShop.filter.clear()
    const filteredProducts = modelShop.catalog.computeProducts()
    modelShop.filter.update(filteredProducts)
    const paginatedProducts =
      modelShop.catalog.computePaginatedProducts(filteredProducts)
    modelShop.priceRanger.resetFromTo()
    this.handleShowCatalog(paginatedProducts)
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

  handleFiltrate() {
    const checkedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    )
    const attrIds = Array.from(checkedCheckboxes).map(checkbox => {
      const key = checkbox.name
      const value = checkbox.value
      return `${key}-${value}`
    })

    modelShop.attrSelector.createCheckedAttrs(attrIds)
    modelShop.catalog.computeProducts()
    modelShop.priceRanger.resetFromTo()
    this.handleShowCatalog()
  },

  handleClearFilter() {
    modelShop.attrSelector.clearCheckedAttrs()
    viewFilter.renderClearFilters()
    this.handleShowCatalog()
  },

  handleFavorite(productId) {
    const product = modelShop.catalog.getProductById(productId)
    const favoriteButton = document.querySelector(
      `[data-product-id="${productId}"] .favorite button`
    )
    if (product.isFavorite) {
      product.removeFromFavorites()
      favoriteButton.classList.remove('favorite-btn')
    } else {
      product.addToFavorites()
      favoriteButton.classList.add('favorite-btn')
    }
  },
}

export default controller
