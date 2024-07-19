const Shop = require('./Shop.class')
const Catalog = require('./Catalog.class')
const products = require('./products.json')
const Filter = require('./Filter.class')

// const filter = new Filter(products)
// filter.clear()
// filter.update(products)
// console.log(filter)

const catalog = new Catalog()
catalog.addProducts(products)
// console.log('catalog', catalog)

const shop = new Shop()
console.log(shop.catalog.search)

// shop.updateSearch()
// shop.initCheckedAttrs()
// shop.initPriceRanger()
// shop.initSorter()
// shop.initPaginator(2)
// shop.initFilter()

// shop.search.setQuery('Intel')

// shop.sorter.setSortingType('byPriceDESC')
// shop.attrSelector.createCheckedAttrs(['ssd-kingston'])
// shop.attrSelector.createCheckedAttrs(['ssd-2000PRO'])
// shop.attrSelector.createCheckedAttrs(['ssd-3000PRO'])
// shop.attrSelector.createCheckedAttrs(['ssd-4000PRO'])

// catalog.priceRanger.setFrom(3001)
// catalog.priceRanger.setTo(4001)

// console.log('Computed Products:', catalog.computedProducts())
// console.log(catalog.filter)

// catalog.search.setQuery('')
// catalog.attrSelector.createCheckedAttrs([])
// catalog.priceRanger.resetFromTo()
// catalog.sorter.setSortingType('')

// console.log(catalog.computedProducts())
// catalog.paginator.setCurrentPage(0)
// console.log('Page 0:', catalog.computedProducts())
// catalog.paginator.setCurrentPage(1)
// console.log('Page 1:', catalog.computedProducts())
// catalog.paginator.setCurrentPage(2)
// console.log('Page 2:', catalog.computedProducts())
// catalog.paginator.setCurrentPage(3)
// console.log('Page 3:', catalog.computedProducts())
// console.log(catalog.filter)
