const Catalog = require('./Catalog.class')
const Cart = require('./Cart.class')

const products = [
  {
    id: 100,
    caption: 'Apple Mac Book Pro',
    price: 200,
    convertedPrice: 1000,
    attributes: {
      ssd: 'San Disk',
      ram: 'DDR4',
    },
  },
  {
    id: 101,
    caption: 'Intel Pentium',
    price: 100,
    convertedPrice: 2000,
    attributes: { ssd: 'apple', ram: 'DDR3' },
  },
  {
    id: 102,
    caption: 'Intel Core',
    price: 300,
    convertedPrice: 3000,
    attributes: { ssd: 'PNY' },
  },
  {
    id: 103,
    caption: 'Intel Core',
    price: 400,
    convertedPrice: 4000,
    attributes: { ssd: 'kingston' },
  },
  {
    id: 104,
    caption: 'Intel Core Duo',
    price: 500,
    convertedPrice: 5000,
    attributes: { ssd: 'samsung' },
  },
  {
    id: 105,
    caption: 'Intel Duo ',
    price: 600,
    convertedPrice: 6000,
    attributes: { ssd: 'GOODRAM' },
  },
  {
    id: 106,
    caption: 'Intel Duo ',
    price: 600,
    convertedPrice: 6000,
    attributes: { ssd: 'WD' },
  },
  {
    id: 107,
    caption: 'Intel Core i5 ',
    price: 800,
    convertedPrice: 8000,
    attributes: {
      'Блок питания': '500W',
      'Материнская платa': 'Asus',
      ссд: '2000PRO',
    },
  },
]

const catalog = new Catalog()
catalog.addProducts(products)
catalog.initSearch()
catalog.initCheckedAttrs()
catalog.initPriceRanger()
catalog.initSorter()
catalog.initPaginator(2)
catalog.initFilter()

// catalog.filter.updateFilter(catalog.products)
// console.log('Created filter:', catalog.filter)

// catalog.search.setQuery('Intel')
// catalog.sorter.setSortingType('byPriceDESC')
catalog.attrSelector.createCheckedAttrs(['ssd-kingston'])
catalog.attrSelector.createCheckedAttrs(['ssd-2000PRO'])
catalog.attrSelector.createCheckedAttrs(['ssd-3000PRO'])
catalog.attrSelector.createCheckedAttrs(['ssd-4000PRO'])

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

const cart = new Cart()
cart.addProduct(products[0])
console.log(cart)
cart.removeProduct(100)
console.log(cart.products)
console.log('ww',cart.products)

