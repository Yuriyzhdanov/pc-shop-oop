import controller from './controller/controller.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  if (location.pathname.includes('catalog.html')) {
    await controller.handleDOMContentLoaded()
  }
}
