const modelFilter = new Filter()
// const modelFilter = shop.filter

modelFilter.update(products)
// modelFilter.update(shop.catalog.products)

filter.renderFilter(modelFilter)
console.log(modelFilter)
