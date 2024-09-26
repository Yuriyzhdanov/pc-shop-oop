import controllerProduct from './controller/controllerProduct.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controllerProduct.handleDOMContentLoaded()
}
