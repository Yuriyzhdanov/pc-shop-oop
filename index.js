const Catalog = require('./Catalog.class')
const Product = require('./Product.class')
const Search = require('./Search.class')

const products = [
  {
    id: 42,
    caption: 'Apple Mac Book Pro',
    price: 50000,
    attributes: { ssd: 'amd' },
  },
  {
    id: 101,
    caption: 'Intel Pentium',
    price: 10000,
    attributes: { ssd: 'apple' },
  },
  {
    id: 102,
    caption: 'Intel Core',
    price: 10000,
    attributes: { ssd: 'kingston' },
  },
]

let result
const catalog = new Catalog()
catalog.addProducts(products)

catalog.initSearch()
catalog.initCheckedAttrs()
// console.log(catalog.computedProducts())
// console.log('=======')

// catalog.search.setQuery('Apple')
// console.log(catalog.computedProducts())

console.log('=======')
console.log('hello');

catalog.search.setQuery('')
catalog.checkedAttrs.createCheckedAttrs(['ssd-kingston'])
console.log(catalog.computedProducts())
