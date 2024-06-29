const Catalog = require('./Catalog.class')
const Product = require('./Product.class')
const Search = require('./Search.class')

const products = [
  {
    id: 42,
    caption: 'Apple Mac Book Pro',
    price: 100,
    convertedPrice: 1000,
    attributes: { ssd: 'amd' },
  },
  {
    id: 101,
    caption: 'Intel Pentium',
    price: 200,
    convertedPrice: 2000,
    attributes: { ssd: 'apple' },
  },
  {
    id: 102,
    caption: 'Intel Core',
    price: 300,
    convertedPrice: 3000,
    attributes: { ssd: 'kingston' },
  },
]

const catalog = new Catalog()
catalog.addProducts(products)
catalog.initSearch()
// catalog.search.setQuery('')
console.log(catalog.computedProducts())

// catalog.initCheckedAttrs()
// catalog.initPriceRanger()

// console.log(catalog.computedProducts())

// catalog.search.setQuery('Apple')
// console.log(catalog.computedProducts())

// catalog.checkedAttrs.createCheckedAttrs(['ssd-kingston'])
// catalog.priceRanger.setFrom(1001)
// catalog.priceRanger.setTo(2001)
