import controller from '../controller/controller.js'

const viewPriceRanger = {
  selectorFrom: '#price_from',
  selectorTo: '#price_to',
  labelFrom: 'label[for="price_from"] span',
  labelTo: 'label[for="price_to"] span',

  render(min, max, from, to) {
    this.renderFilterRangeFrom(from, min, max)
    this.renderFilterRangeTo(to, min, max)
    this.renderLabelFrom(from)
    this.renderLabelTo(to)
  },

  renderLabelFrom(val) {
    const labelFrom = document.querySelector(this.labelFrom)
    labelFrom.textContent = +val
  },

  renderLabelTo(val) {
    const labelTo = document.querySelector(this.labelTo)
    labelTo.textContent = +val
  },

  renderFilterRangeFrom(val, min, max) {
    const elPriceFrom = document.querySelector(this.selectorFrom)
    elPriceFrom.value = +val
    elPriceFrom.min = min
    elPriceFrom.max = max
  },

  renderFilterRangeTo(val, min, max) {
    const elPriceTo = document.querySelector(this.selectorTo)
    elPriceTo.value = +val
    elPriceTo.min = min
    elPriceTo.max = max
  },

  onInputRangeFrom(e) {
    const rangeFrom = +e.target.value
    console.log('rangeFrom', rangeFrom)

    controller.handleUpdatePriceFrom(rangeFrom)
  },

  onInputRangeTo(e) {
    const rangeTo = +e.target.value
    console.log('rangeTo', rangeTo)

    controller.handleUpdatePriceTo(rangeTo)
  },

  init() {
    const elPriceFrom = document.querySelector(this.selectorFrom)
    const elPriceTo = document.querySelector(this.selectorTo)

    elPriceFrom.addEventListener('input', this.onInputRangeFrom)
    elPriceTo.addEventListener('input', this.onInputRangeTo)
  },
}

window.viewPriceRanger = viewPriceRanger

export default viewPriceRanger
