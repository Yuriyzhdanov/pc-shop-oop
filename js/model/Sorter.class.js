class Sorter {
  constructor() {
    this.availableSortingTypes = [
      'byPriceASC',
      'byPriceDESC',
      'byCaptionASC',
      'byCaptionDESC',
    ]
    this.sortingType = 'byPriceASC'
  }

  getCurrentSortingType() {
    return this.sortingType
  }

  getAvailableSortingTypes() {
    return this.availableSortingTypes
  }

  setSortingType(sortingType) {
    if (this.availableSortingTypes.includes(sortingType)) {
      this.sortingType = sortingType
    }
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
