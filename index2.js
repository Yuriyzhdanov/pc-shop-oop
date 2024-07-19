const api = require('./api')
const Shop = require('./Shop.class')

const shop = new Shop(api)

async function afn() {
  await shop.updateCatalog()
  // console.log(shop.catalog.products.length)
  console.log('search:', shop.search.query)
  console.log('attrSelector:', shop.attrSelector.checkedAttrs)
  console.log('priceRanger:', shop.priceRanger.from, shop.priceRanger.to)
  console.log('sorter:', shop.sorter.sortingType)
  console.log('page:', shop.paginator.currentPage, shop.paginator.pagesCount)

  // shop.search.setQuery('Intel')
  // console.log(shop.catalog.computeProducts().length)

  //
  //

  // shop.paginator.setCurrentPage(2)
  console.log(shop.catalog.computeProducts())
}

afn()

// shop.catalog.computeProducts()
