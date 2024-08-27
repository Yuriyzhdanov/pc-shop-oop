import controller from '../controller/controller.js'

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

  init() {
    const elInput = document.querySelector(this.inputSelector)
    elInput.addEventListener('input', this.onSearchInput.bind(this))

    const elSearchBtn = document.querySelector('.search-btn')
    elSearchBtn.addEventListener('click', this.onSearchClickBtn.bind(this))
  },
}

export default viewSearch
