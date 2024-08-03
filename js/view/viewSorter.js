import controller from '../controller/controller.js'

const viewSort = {
  selector: '.sort',

  onSortChange(e) {
    const sortType = e.target.value
    controller.handleSortChange(sortType)
  },

  init() {
    const elSorter = document.querySelector(this.selector)
    elSorter.addEventListener('change', this.onSortChange)
  },
}

export default viewSort
