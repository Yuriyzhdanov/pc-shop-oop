class Paginator {
  constructor() {
    this.productsOnPage = 10
    this.currentPage = 0
    this.pagesCount = 0
    this.productsCount = 0
  }

  getPagesCount() {
    return this.pagesCount
  }

  getCurrentPage() {
    return this.currentPage
  }

  setProductsCount(productsCount) {
    this.productsCount = productsCount
    this.calcPagesCount()
  }

  setProductsOnPage(productsOnPage) {
    this.productsOnPage = productsOnPage
    this.calcPagesCount()
  }

  setCurrentPage(page) {
    this.currentPage = page
  }

  calcPagesCount() {
    console.log('>>>', arguments.callee)
    console.log('calcPagesCount()')
    this.pagesCount = Math.trunc(this.productsCount / this.productsOnPage) + 1
    this.setCurrentPage(0)
  }

  run(products) {
    this.setProductsCount(products.length)
    const startFrom = this.currentPage * this.productsOnPage
    const endTo = startFrom + this.productsOnPage
    return products.slice(startFrom, endTo)
  }
}

export default Paginator
