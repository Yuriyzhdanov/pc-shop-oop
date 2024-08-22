import controller from '../controller/controller.js'

const viewSearch = {
  selector: '#searchContainer',
  inputSelector: '#query',

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
    const query = e.target.value
    controller.handleSearchQuery(query)
  },

  init() {
    const elInput = document.querySelector(this.inputSelector)
    elInput.addEventListener('input', this.onSearchInput)

    // const searchInput = document.querySelector('#productCaptions')
    // searchInput.addEventListener('input', () => {
    //   if (searchInput.value === '') {
    //     controller.handleClearSearch()
    //   }
    // })
  },
}

export default viewSearch
