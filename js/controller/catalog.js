function handleUpdateCatalog() {
  renderCatalog(shop.catalog.computeProducts())
  renderInputRangePrice(
    shop.priceRanger.min,
    shop.priceRanger.max,
    shop.priceRanger.form,
    shop.priceRanger.to
  )
}
