import controller from './controller/controllerFavorites.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controller.handleDOMContentLoaded()
}
