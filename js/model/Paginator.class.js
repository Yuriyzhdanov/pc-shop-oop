class Paginator {
  constructor() {
    this.productsOnPage = 10
    this.currentPage = 0
    this.productsCount = 0
  }

  setProductsOnPage(productsOnPage) {
    this.productsOnPage = productsOnPage
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
