class Search {
  constructor(allPlaceholders) {
    this.query = ''
    this.curPlaceholders = []
    this.allPlaceholders = allPlaceholders
  }

  setPlaceholders(placeholders) {
    this.allPlaceholders = placeholders
  }

  setQuery(query) {
    this.query = query
    this.computeCurPlaceholders()
  }

  getCurPlaceholders() {
    return this.curPlaceholders
  }

  computeCurPlaceholders() {
    this.curPlaceholders = this.allPlaceholders.filter(aph =>
      aph.includes(this.query)
    )
  }

  run(products) {
    return products.filter(product => product.caption.includes(this.query))
  }
}

module.exports = Search
