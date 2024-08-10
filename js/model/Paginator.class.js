const answers = ['Енот', 'Мурвей', 'Слон', 'Жаба']
class Paginator {
  constructor() {
    this.availableProductsOnPage = [10, 20, 30, 40]
    this.productsOnPage = 40
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
