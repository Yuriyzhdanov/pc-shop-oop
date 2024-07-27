class Sorter {
  constructor() {
    this.sortingType = ''
  }

  setSortingType(sortingType) {
    this.sortingType = sortingType
  }

  run(products) {
    const sortFunctions = {
      byPriceASC: (a, b) => a.convertedPrice - b.convertedPrice,
      byPriceDESC: (a, b) => b.convertedPrice - a.convertedPrice,
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

export default Sorter
