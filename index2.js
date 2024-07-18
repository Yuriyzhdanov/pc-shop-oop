const api = require('./api')
const Shop = require('./Shop.class')

const shop = new Shop(api)

console.log(shop)

// shop.catalog.computeProducts()
