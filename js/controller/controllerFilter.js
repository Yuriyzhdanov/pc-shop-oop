import modelShop from '../model/model.js'
import viewFilter from '../view/viewFilter.js'

const controllerFilter = {
  async handleDOMContentLoaded() {
    await modelShop.updateCatalog()
    console.log(modelShop.filter)
    viewFilter.renderFilter(modelShop.filter)
  },
}

export default controllerFilter
