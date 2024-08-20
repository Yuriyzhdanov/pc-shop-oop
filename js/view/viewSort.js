import controller from '../controller/controller.js'

const viewSort = {
  selector: '.sort',

  renderSortingOptions(options, selectedOption) {
    const elSorter = document.querySelector(this.selector)
    elSorter.innerHTML = ''

    options.forEach(optionValue => {
      const elOption = document.createElement('option')
      elOption.value = optionValue
      elOption.textContent = this.getSortingLabel(optionValue)
      if (optionValue === selectedOption) {
        elOption.setAttribute('selected', '')
      }
      elSorter.appendChild(elOption)
    })
  },

  getSortingLabel(sortingType) {
    const labels = {
      byPriceASC: 'От дешевых к дорогим',
      byPriceDESC: 'От дорогиx к дешевым',
      byCaptionASC: 'A - Я',
      byCaptionDESC: 'Я - А',
    }
    return labels[sortingType] || sortingType
  },

  onSortChange(e) {
    const sortType = e.target.value
    controller.handleSortChange(sortType)
  },

  init() {
    const elSorter = document.querySelector(this.selector)
    elSorter.addEventListener('change', this.onSortChange)
  },
}

export default viewSort
