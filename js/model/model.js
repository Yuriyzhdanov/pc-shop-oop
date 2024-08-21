import api from '../api/api.js'
import Shop from './Shop.class.js'

const modelShop = new Shop(api)

window.modelShop = modelShop

// async function afn() {
//   await modelShop.updateCatalog()
//   // shop.priceRanger.setFrom(2000)
//   // shop.priceRanger.setTo(4000)
//   // console.log(shop.catalog.products.length)
//   console.log('search:', modelShop.search.query)
//   console.log('attrSelector:', modelShop.attrSelector.checkedAttrs)
//   console.log(
//     'priceRangerFromTo:',
//     modelShop.priceRanger.from,
//     modelShop.priceRanger.to
//   )
//   console.log(
//     'priceRangerMinMax:',
//     modelShop.priceRanger.min,
//     modelShop.priceRanger.max
//   )
//   console.log('sorter:', modelShop.sorter.sortingType)
//   console.log(
//     'page:',
//     modelShop.paginator.currentPage,
//     modelShop.paginator.pagesCount
//   )

// modelShop.search.setQuery('Duo')
// console.log(modelShop.catalog.computeProducts().length)

// modelShop.attrSelector.createCheckedAttrs(['ssd-kingston', 'ssd-samsung'])

//
//
//   modelShop.sorter.setSortingType('byPriceDESC')

//   // modelShop.paginator.setCurrentPage(2)
//   console.log(modelShop.catalog.computeProducts().length)
//   // console.log(modelShop.catalog.products)
// }

// afn()

export default modelShop
