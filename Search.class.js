class Search {
  constructor(allPlaceholders) {
    this.query = ''
    this.curPlaceholders = []
    this.allPlaceholders = allPlaceholders
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

// const search = new Search(['qwe', 'qaz', 'asd', 'zxc'])

// search.setQuery('q')
// console.log(search.getCurPlaceholders())

// search.setQuery('qw')
// console.log(search.getCurPlaceholders())
