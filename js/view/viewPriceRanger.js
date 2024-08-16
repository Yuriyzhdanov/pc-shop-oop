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

  checkingRangeTo(rangeFrom) {
    const elInputTo = document.querySelector(this.selectorTo)
    if (elInputTo && +elInputTo.value <= +rangeFrom) {
      elInputTo.value = +rangeFrom
      this.renderFilterRangeTo(rangeFrom, elInputTo.min, elInputTo.max)
      this.renderLabelTo(rangeFrom)
    }
  },

  checkingRangeFrom(rangeTo) {
    const elInputFrom = document.querySelector(this.selectorFrom)
    if (elInputFrom && +elInputFrom.value >= +rangeTo) {
      elInputFrom.value = +rangeTo
      console.log()

      this.renderFilterRangeFrom(rangeTo, elInputFrom.min, elInputFrom.max)
      this.renderLabelFrom(rangeTo)
    }
  },

  onInputRangeFrom(e) {
    const rangeFrom = e.target.value
    const elInputTo = document.querySelector(this.selectorTo)
    const rangeTo = elInputTo.value
    this.checkingRangeFrom(rangeTo)

    this.renderLabelFrom(rangeFrom)
    controller.handleUpdatePriceFrom(rangeFrom)
  },

  onInputRangeTo(e) {
    const rangeTo = e.target.value
    const elInputFrom = document.querySelector(this.selectorFrom)
    const rangeFrom = elInputFrom.value
    this.checkingRangeFrom(rangeFrom)

    this.renderLabelTo(rangeTo)
    controller.handleUpdatePriceTo(rangeTo)
  },

  init() {
    const elPriceFrom = document.querySelector(this.selectorFrom)
    const elPriceTo = document.querySelector(this.selectorTo)

    elPriceFrom.addEventListener('input', this.onInputRangeFrom.bind(this))
    elPriceTo.addEventListener('input', this.onInputRangeTo.bind(this))
  },
}

window.viewPriceRanger = viewPriceRanger

export default viewPriceRanger
