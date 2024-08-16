class Paginator {
  constructor() {
    this.availableProductsOnPage = [7, 21, 33, 42, 99]
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
