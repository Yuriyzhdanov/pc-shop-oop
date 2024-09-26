import controller from './controller/controllerProduct.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controller.handleDOMContentLoaded()
}
