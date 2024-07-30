import controller from '../controller/controller.js'
const viewPaginator = {
  selector: '.container-pagination',

  render(pagesCount, currentPage = 0) {
    const elPaginationContainer = document.querySelector(this.selector)
    const elPagination = this.generate(pagesCount, currentPage)
    console.log(elPaginationContainer)
    elPaginationContainer.innerHTML = ''
    elPaginationContainer.appendChild(elPagination)
  },

  generate(pagesCount, currentPage) {
    console.log('pagesCount :>> ', pagesCount)
    console.log('curPage :>> ', currentPage)
    const elPagination = document.createElement('div')
    elPagination.classList.add('pagination')
    for (let i = 0; i < pagesCount; i++) {
      const pageLink = document.createElement('a')
      pageLink.href = '#header'

      pageLink.textContent = i

      pageLink.addEventListener('click', () => controller.handlePageClick(i))
      pageLink.classList.add('page')
      if (i === currentPage) {
        pageLink.classList.add('active')
      }
      elPagination.appendChild(pageLink)
    }
    return elPagination
  },

  // onClickButtonPage(e) {
  //   const currentPage = +e.target.textContent
  // },

  // init() {
  //   const elPaginationContainer = document.querySelector(this.selector)
  //   elPaginationContainer.addEventListener('click', this.onClickButtonPage)
  // },
}

export default viewPaginator
