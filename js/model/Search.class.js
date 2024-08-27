class Search {
  constructor(allPlaceholders) {
    this.query = ''
    this.curPlaceholders = []
    this.allPlaceholders = allPlaceholders
  }

  setPlaceholders(placeholders) {
    this.allPlaceholders = placeholders
    this.computeCurPlaceholders()
  }

  setQuery(query) {
    this.query = query
    this.computeCurPlaceholders()
  }

  getCurPlaceholders() {
    return this.curPlaceholders
  }

  getAllPlaceholders() {
    return this.allPlaceholders
  }

  computeCurPlaceholders() {
    this.curPlaceholders = this.allPlaceholders.filter(aph =>
      aph.includes(this.query)
    )
  }

  run(products) {
    const filteredProducts = products.filter(product =>
      product.caption.toLowerCase().includes(this.query.toLowerCase())
    )
    if (filteredProducts.length === 0) {
      console.log('Данный товар по запросу не найден')
    }

    return filteredProducts
  }
}

export default Search
