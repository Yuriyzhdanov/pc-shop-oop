import modelShop from '../model/model.js'
import viewFilter from '../view/viewFilter.js'
import viewPaginator from '../view/viewPaginator.js'

const controller = {
  async handleDOMContentLoaded() {
    await modelShop.init()
    viewFilter.render(modelShop.filter)
    viewPaginator.render(
      modelShop.paginator.getPagesCount(),
      modelShop.paginator.getCurrentPage()
    )
  },
}

export default controller
