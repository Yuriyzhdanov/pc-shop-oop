class Sorter {
  constructor(sortingType) {
    this.sortedProducts = []
    this.sortingType = sortingType
  }

  setSortingType(sortingType) {
    if (sortingType) {
      this.sortingType = sortingType
    }
  }

  sortProducts(products) {
    this.sortedProducts = products.slice()

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
      this.sortedProducts.sort(sortFunction)
    }
  }
}
module.exports = Sorter