import controllerFilter from './controller/controllerFilter.js'
import controllerPaginator from './controller/controllerPaginator.js'

document.addEventListener('DOMContentLoaded', async () => {
  await controllerFilter.handleDOMContentLoaded()
  await controllerPaginator.handleDOMContentLoaded()
})
