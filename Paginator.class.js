class Paginator {
  constructor(perCountPages = 10) {
    this.currentPage = 0
    this.countPages = 0
    this.countProducts = 0
    this.perCountPages = perCountPages
  }
  run(currentPage, products) {
    const startFrom = currentPage * this.perCountPages
    const endTo = startFrom + this.perCountPages
    return products.slice(startFrom, endTo)
  }
}
module.exports = Paginator
