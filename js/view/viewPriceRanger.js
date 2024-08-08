import controller from '../controller/controller.js'

const viewPriceRanger = {
  selectorFrom: '#price_from',
  selectorTo: '#price_to',

  render(min, max, from, to) {
    this.renderFilterRangeFrom(from, min, max)
    this.renderFilterRangeTo(to, min, max)
    this.renderLabelFrom(from)
    this.renderLabelTo(to)
  },

  renderLabelFrom(val) {
    const labelFrom = document.querySelector('label[for="price_from"] span')
    labelFrom.textContent = +val
  },

  renderLabelTo(val) {
    const labelTo = document.querySelector('label[for="price_to"] span')
    labelTo.textContent = +val
  },

  renderFilterRangeFrom(val, min, max) {
    const elPriceFrom = document.querySelector(this.selectorFrom)
    elPriceFrom.min = min
    elPriceFrom.max = max
    elPriceFrom.value = +val
  },

  renderFilterRangeTo(val, min, max) {
    const elPriceTo = document.querySelector(this.selectorTo)
    elPriceTo.min = min
    elPriceTo.max = max
    elPriceTo.value = +val
  },

  onInputRangeFrom(e) {
    const rangeFrom = e.target.value
    controller.handleUpdatePriceFrom(rangeFrom)
  },

  onInputRangeTo(e) {
    const rangeTo = e.target.value
    controller.handleUpdatePriceTo(rangeTo)
  },

  init() {
    const elPriceFrom = document.querySelector(this.selectorFrom)
    const elPriceTo = document.querySelector(this.selectorTo)

    elPriceFrom.addEventListener('input', this.onInputRangeFrom)
    elPriceTo.addEventListener('input', this.onInputRangeTo)
  },
}

export default viewPriceRanger
