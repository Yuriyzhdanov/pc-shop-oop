class Paginator {
  constructor() {
    this.perPageCount = 2
    this.currentPage = 0
    this.pagesCount = 0
    this.productsCount = 0
  }

  getPagesCount() {
    return this.pagesCount
  }

  setProductCount(productsCount) {
    this.productsCount = productsCount
    this.calcCountPages()
  }

  setPerPageCount(perPageCount) {
    this.perPageCount = perPageCount
    this.calcCountPages()
  }

  setCurrentPage(page) {
    this.currentPage = page
  }

  calcCountPages() {
    this.pagesCount = Math.trunc(this.productsCount / this.perPageCount)
  }

  run(products) {
    this.setProductCount(products.length)
    const startFrom = this.currentPage * this.perPageCount
    const endTo = startFrom + this.perPageCount
    return products.slice(startFrom, endTo)
  }
}

module.exports = Paginator
