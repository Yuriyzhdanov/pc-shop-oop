class AttrSelector {
  constructor() {
    this.checkedAttrs = []
  }

  clearCheckedAttrs() {
    this.checkedAttrs = []
  }

  /**
   * attrIds array like ['ssd-kingston', 'ssd-samsung']
   * @param {array<string>} attrIds
   *
   */
  createCheckedAttrs(attrIds) {
    this.clearCheckedAttrs()
    attrIds.forEach(filterDataId => {
      const idParts = filterDataId.split('-')
      const key = idParts[0]
      const value = idParts[1]
      const isExistFilter = this.checkedAttrs.find(filter => filter.key === key)
      if (isExistFilter) {
        isExistFilter.values.push(value)
      } else {
        this.checkedAttrs.push({ key, values: [value] })
      }
    })
  }

  run(products) {
    return products.filter(product => {
      let matchedCount = 0
      this.checkedAttrs.forEach(filter => {
        const { key, values } = filter
        if (values.includes(product.attributes[key])) {
          matchedCount++
        }
      })
      return matchedCount === this.checkedAttrs.length
    })
  }
}

export default AttrSelector
