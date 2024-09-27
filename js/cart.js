import controllerCart from './controller/controllerCart.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controllerCart.handleDOMContentLoaded()
}
