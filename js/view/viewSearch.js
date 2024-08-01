import controller from '../controller/controller.js'

const viewSearch = {
  selector: '#searchContainer', 
  inputSelector: '#query',
  
  renderDataList(captions) {
    const elDataList = document.querySelector('#productCaptions')

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
  },
}

export default viewSearch