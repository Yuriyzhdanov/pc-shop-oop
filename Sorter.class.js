class Sorter {
  constructor() {
    this.sortingType = ''
  }

  setSortingType(sortingType) {
    this.sortingType = sortingType
  }

  run(products) {
    const sortFunctions = {
      byPriceASC: (a, b) => a.price - b.price,
      byPriceDESC: (a, b) => b.price - a.price,
      byCaptionASC: (a, b) =>
        a.caption.localeCompare(b.caption, undefined, {
          sensitivity: 'accent',
        }),
      byCaptionDESC: (a, b) =>
        b.caption.localeCompare(a.caption, undefined, {
          sensitivity: 'accent',
        }),
    }
    const sortFunction = sortFunctions[this.sortingType]
    if (sortFunction) {
      return products.toSorted(sortFunction)
    }
    return products
  }
}

module.exports = Sorter
