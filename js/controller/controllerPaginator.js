function handleChangePage(pageNum) {
  shop.paginator.setCurrentPage(pageNum)
  handleUpdateCatalog()
}

function onClickPaginationPage(e) {
  const pageNum = e.target.textContent
  handlePageClick(pageNum)
}