const api = require('./api')
const Shop = require('./Shop.class')

const shop = new Shop(api)

async function afn() {
  await shop.updateCatalog()
  // shop.priceRanger.setFrom(2000)
  // shop.priceRanger.setTo(4000)
  // console.log(shop.catalog.products.length)
  console.log('search:', shop.search.query)
  console.log('attrSelector:', shop.attrSelector.checkedAttrs)
  console.log('priceRangerFromTo:', shop.priceRanger.from, shop.priceRanger.to)
  console.log('priceRangerMinMax:', shop.priceRanger.min, shop.priceRanger.max)
  console.log('sorter:', shop.sorter.sortingType)
  console.log('page:', shop.paginator.currentPage, shop.paginator.pagesCount)

  shop.search.setQuery('Duo')
  // console.log(shop.catalog.computeProducts().length)

  // shop.attrSelector.createCheckedAttrs(['ssd-kingston', 'ssd-samsung'])

  //
  //
  shop.sorter.setSortingType('byPriceDESC')

  // shop.paginator.setCurrentPage(2)
  console.log(shop.catalog.computeProducts())
}

afn()
