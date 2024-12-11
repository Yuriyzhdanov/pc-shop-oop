import controller from '../controller/controllerCatalog.js'

const viewSearch = {
  selector: '#searchContainer',
  inputSelector: '#query',
  searchQuery: '',

  renderDataList(captions) {
    const elDataList = document.querySelector('#productCaptions')
    elDataList.innerHTML = ''
    captions.forEach(caption => {
      const option = document.createElement('option')
      option.value = caption
      elDataList.appendChild(option)
    })
  },

  onSearchInput(e) {
    this.searchQuery = e.target.value
  },

  onSearchClickBtn() {
    controller.handleSearchQuery(this.searchQuery)
  },

  onSearchKeydown(e) {
    if (e.key === 'Enter') {
      const elSearchBtn = document.querySelector('.search-btn')
      elSearchBtn.click()
    }
  },

  init() {
    const elInput = document.querySelector(this.inputSelector)
    const elSearchBtn = document.querySelector('.search-btn')
    elInput.addEventListener('input', this.onSearchInput.bind(this))
    elSearchBtn.addEventListener('click', this.onSearchClickBtn.bind(this))
    elInput.addEventListener('keydown', this.onSearchKeydown.bind(this))
  },
}

export default viewSearch
