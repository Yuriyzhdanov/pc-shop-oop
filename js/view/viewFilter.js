import h from './h.js'

const viewFilter = {
  selector: '.wrap-filter',

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
}

export default viewFilter
