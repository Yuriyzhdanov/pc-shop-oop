import controllerFavorites from './controller/controllerFavorites.js'
document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)
async function onDOMContentLoadedDocument() {
  await controllerFavorites.handleDOMContentLoaded()
}
