const Catalog = require('./Catalog.class')

const products = [
  {
    id: 100,
    caption: 'Apple Mac Book Pro',
    price: 200,
    convertedPrice: 1000,
    attributes: { ssd: 'amd' },
  },
  {
    id: 101,
    caption: 'Intel Pentium',
    price: 100,
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
    attributes: { ssd: 'adata' },
  },
]

const catalog = new Catalog()
catalog.addProducts(products)
catalog.initSearch()
catalog.initCheckedAttrs()
catalog.initPriceRanger()
catalog.initFilter()
catalog.initSorter()
catalog.initPaginator(2)

catalog.search.setQuery('Intel')
catalog.sorter.setSortingType('byPriceDESC')
catalog.attrSelector.createCheckedAttrs(['ssd-kingston'])
catalog.priceRanger.setFrom(3001)
catalog.priceRanger.setTo(4001)
catalog.filter.addFilter('ssd', ['kingston'])

console.log(catalog.computedProducts())

catalog.search.setQuery('')
catalog.attrSelector.createCheckedAttrs([])
catalog.priceRanger.resetFromTo()
catalog.sorter.setSortingType('')

console.log('==============')
// console.log(catalog.computedProducts())
console.log('Page 1:', catalog.computedProducts(0))
console.log('Page 2:', catalog.computedProducts(1))
console.log('Page 3:', catalog.computedProducts(2))
// console.log(catalog.filter);
