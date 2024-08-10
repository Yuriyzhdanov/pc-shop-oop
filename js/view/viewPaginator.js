import controller from '../controller/controller.js'

const viewPaginator = {
  selector: '.container-pagination',

  render(pagesCount, currentPage = 0) {
    const elPaginationContainer = document.querySelector(this.selector)
    const elPagination = this.generate(pagesCount, currentPage)
    elPaginationContainer.innerHTML = ''
    elPaginationContainer.appendChild(elPagination)
  },

  generate(pagesCount, currentPage) {
    const elPagination = document.createElement('div')
    elPagination.classList.add('pagination')
    for (let i = 0; i < pagesCount; i++) {
      const pageLink = document.createElement('a')
      pageLink.href = '#header'

      pageLink.textContent = i

      pageLink.addEventListener('click', this.onClickAPage)
      pageLink.classList.add('page')
      if (i === currentPage) {
        pageLink.classList.add('active')
      }
      elPagination.appendChild(pageLink)
    }
    return elPagination
  },

  onClickAPage(eveny) {
    const page = +eveny.target.textContent
    controller.handleClickPage(page)
  },

  onChangeProductsOnPage(event) {
    const productsOnPage = +event.target.value
    console.log(productsOnPage)
    controller.handleChangeProductsOnPage(productsOnPage)
  },

  renderProductsOnPage(productsOnPage) {
    const elProductsOnPage = document.querySelector('.products-on-page')
    elProductsOnPage.value = productsOnPage
  },

  init() {
    const elProductsOnPage = document.querySelector('.products-on-page')
    elProductsOnPage.addEventListener('change', this.onChangeProductsOnPage)
  },
}

window.viewPaginator = viewPaginator

export default viewPaginator
