const Catalog = require('./Catalog.class')
const Cart = require('./Cart.class')
const Favorite = require('./Favorite.class')
const products = require('./products.json')
const Filter = require('./Filter.class')

const filter = new Filter()
filter.update(products)
filter.clear()
filter.update(products)
console.log(filter)

// const catalog = new Catalog()
// catalog.addProducts(products)
// catalog.initSearch()
// catalog.initCheckedAttrs()
// catalog.initPriceRanger()
// catalog.initSorter()
// catalog.initPaginator(2)
// catalog.initFilter()

// catalog.filter.updateFilter(catalog.products)
// console.log('Created filter:', catalog.filter)

// catalog.search.setQuery('Intel')
// catalog.sorter.setSortingType('byPriceDESC')
// catalog.attrSelector.createCheckedAttrs(['ssd-kingston'])
// catalog.attrSelector.createCheckedAttrs(['ssd-2000PRO'])
// catalog.attrSelector.createCheckedAttrs(['ssd-3000PRO'])
// catalog.attrSelector.createCheckedAttrs(['ssd-4000PRO'])

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
// console.log(catalog.filter);

// const cart = new Cart()
// cart.addProduct(products[0])
// cart.addProduct(products[1])
// // console.log(cart)
// // cart.removeProduct(100)
// // console.log(cart.products)
// console.log('ww', cart.products)

// const favorite = new Favorite()
// favorite.addProduct(products[0])
// console.log('favorite', favorite.products)
