const viewPaginator = {
  generatePagination(pagesCount, curPage) {
    const elPagination = document.createElement('div')
    elPagination.classList.add('pagination')
    for (let i = 1; i <= pagesCount; i++) {
      const pageLink = document.createElement('a')
      pageLink.href = '#header'
      pageLink.textContent = i

      pageLink.addEventListener('click', e => handlePageClick(i))
      pageLink.classList.add('page')
      if (i === curPage) {
        pageLink.classList.add('active')
      }
      elPagination.appendChild(pageLink)
    }
    return elPagination
  },

  renderContainerPagination(pagesCount, curPage = 0) {
    const elPaginationContainer = document.querySelector(
      '.container-pagination'
    )
    const elPagination = generatePagination(pagesCount, curPage)
    elPaginationContainer.innerHTML = ''
    elPaginationContainer.appendChild(elPagination)
  },
}

export default viewPaginator
