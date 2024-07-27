import shop from '../model/model.js'
import viewPaginator from '../view/viewPaginator.js'

const controllerPaginator = {
  async handleDOMContentLoaded() {
    await shop.updateCatalog()
    this.updatePagination()
    this.updateCatalog()
  },

  updatePagination() {
    const pagesCount = shop.paginator.getPagesCount()
    const currentPage = shop.paginator.currentPage
    viewPaginator.renderContainerPagination(pagesCount, currentPage)
  },

  handlePageClick(pageNum) {
    shop.paginator.setCurrentPage(pageNum)
    this.updatePagination()
    this.updateCatalog()
  },

  // async updateCatalog() {
  //   const products = shop.catalog.getCurrentPageProducts()

  //   console.log(products)
  // },
}

export default controllerPaginator
