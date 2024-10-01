import controllerCompare from './controller/controllerCompare.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  await controllerCompare.handleDOMContentLoaded()
}
