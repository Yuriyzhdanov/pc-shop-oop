import controller from './controller/controller.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controller.handleDOMContentLoaded()
}
