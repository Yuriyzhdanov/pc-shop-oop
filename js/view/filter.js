// const h = require('./utils')

const filter = {
  selector: '.wrap-filter',

  renderFilter(modelFilter) {
    const elWrapFilter = document.querySelector(this.selector)
    elWrapFilter.innerHTML = ''
    for (const key in modelFilter) {
      const elProp = this.generateFilterProp(key)
      elWrapFilter.appendChild(elProp)
      for (const item of modelFilter[key]) {
        const elCheckbox = this.generateFilterCheckbox(key, item)
        elProp.appendChild(elCheckbox)
      }
    }
  },

  generateFilterProp(caption) {
    return h('div', { class: 'wrap-props' }, '', [h('h3', '', caption)])
  },

  generateFilterCheckbox(key, value) {
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
