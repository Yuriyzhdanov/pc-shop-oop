class Paginator {
  constructor() {
    this.availableProductsOnPage = [10, 20, 30, 40]
    this.productsOnPage = 10
    this.currentPage = 0
    this.productsCount = 0
  }

  setProductsOnPage(productsOnPage) {
    if (this.availableProductsOnPage.includes(productsOnPage)) {
      this.productsOnPage = productsOnPage
    }
  }

  setCurrentPage(page) {
    const totalPages = this.getPagesCount()
    if (totalPages <= 1) {
      return
    }
    this.currentPage = page
  }

  getCurrentPage() {
    return this.currentPage
  }

  getPagesCount() {
    return Math.ceil(this.productsCount / this.productsOnPage)
  }

  run(products) {
    this.productsCount = products.length
    const startFrom = this.currentPage * this.productsOnPage
    const endTo = startFrom + this.productsOnPage
    return products.slice(startFrom, endTo)
  }
}

export default Paginator
