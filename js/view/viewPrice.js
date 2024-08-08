const viewPrice = {
  
}

function renderLabelFrom(val) {
  const labelFrom = document.querySelector('label[for="price_from"] span')
  labelFrom.textContent = +val
}

function renderLabelTo(val) {
  const labelTo = document.querySelector('label[for="price_to"] span')
  labelTo.textContent = +val
}

function renderFilterRangeFrom(val, min, max) {
  const elPriceFrom = document.querySelector('#price_from')
  elPriceFrom.min = min
  elPriceFrom.max = max
  elPriceFrom.value = +val
  elPriceFrom.oninput = onInputRangeFrom
}

function renderFilterRangeTo(val, min, max) {
  const elPriceTo = document.querySelector('#price_to')
  elPriceTo.min = min
  elPriceTo.max = max
  elPriceTo.value = +val
  elPriceTo.oninput = onInputRangeTo
}

function checkingRangeTo(rangeFrom) {
  const elInputTo = document.querySelector('#price_to')
  if (+elInputTo.value <= +rangeFrom) {
    elInputTo.value = rangeFrom
  }
}
function checkingRangeFrom(rangeTo) {
  const elInputFrom = document.querySelector('#price_from')
  if (+elInputFrom.value >= +rangeTo) {
    elInputFrom.value = rangeTo
  }
}

function onInputRangeFrom(e) {
  const rangeFrom = e.target.value
  renderLabelFrom(rangeFrom)
  checkingRangeTo(rangeFrom)
  handlerUpdatePriceFrom(rangeFrom)
}

function onInputRangeTo(e) {
  const rangeTo = e.target.value
  renderLabelTo(rangeTo)
  checkingRangeFrom(rangeTo)
  handlerUpdatePriceTo(rangeTo)
}