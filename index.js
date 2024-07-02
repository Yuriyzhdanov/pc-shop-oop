const Catalog = require('./Catalog.class')

const products = [
  {
    id: 42,
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
]

const catalog = new Catalog()
catalog.addProducts(products)
catalog.initSearch()
catalog.initCheckedAttrs()
catalog.initPriceRanger()
catalog.initSorter()

catalog.search.setQuery('Intel')
catalog.sorter.setSortingType('byPriceDESC')
catalog.attrSelector.createCheckedAttrs(['ssd-kingston'])
catalog.priceRanger.setFrom(3001)
catalog.priceRanger.setTo(4001)

console.log(catalog.computedProducts())

catalog.search.setQuery('')
catalog.attrSelector.createCheckedAttrs([])
catalog.priceRanger.resetFromTo()
catalog.sorter.setSortingType('')

console.log('==============')
console.log(catalog.computedProducts())
