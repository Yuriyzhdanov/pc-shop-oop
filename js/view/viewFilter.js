import h from './h.js'
import controller from '../controller/controller.js'

const viewFilter = {
  selector: '.wrap-filter',
  buttonFilter: '.btn.filter',
  buttonClearFilter: '.btn.clear-filter',

  render(modelFilter) {
    const elWrapFilter = document.querySelector(this.selector)
    elWrapFilter.innerHTML = ''
    for (const key in modelFilter) {
      const elProp = this.generateProp(key)
      elWrapFilter.appendChild(elProp)
      for (const item of modelFilter[key]) {
        const elCheckbox = this.generateCheckbox(key, item)
        elProp.appendChild(elCheckbox)
      }
    }
  },

  generateProp(caption) {
    return h('div', { class: 'wrap-props' }, '', [h('h3', '', caption)])
  },

  generateCheckbox(key, value) {
    return h('div', { class: 'wrap-checkbox' }, '', [
      h(
        'input',
        {
          type: 'checkbox',
          value: value,
          name: `${key}`,
          id: `${key}-${value}`,
        },
        ''
      ),
      h('label', { for: `${key}-${value}` }, value),
    ])
  },

  renderClearFilters() {
    const elCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    elCheckboxes.forEach(checkbox => (checkbox.checked = false))
  },

  onFilterButtonClick() {
    controller.handleFiltrate()
  },

  onClearFilterButtonClick() {
    controller.handleClearFilter()
  },

  init() {
    const elButton = document.querySelector(this.buttonFilter)
    const elButtonClearFilter = document.querySelector(this.buttonClearFilter)

    elButton.addEventListener('click', onFilterButtonClick)
    elButtonClearFilter.addEventListener('click', onClearFilterButtonClick)
  },
}

export default viewFilter
