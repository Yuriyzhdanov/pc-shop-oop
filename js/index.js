import controllerCatalog from './controller/controllerCatalog.js'
// import controllerFavorites from './controller/controllerFavorites.js'
// import controllerProduct from './controller/controllerProduct.js'
// import controllerCart from './controller/controllerCart.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoadedDocument)

async function onDOMContentLoadedDocument() {
  if (location.pathname.includes('catalog.html')) {
    await controllerCatalog.handleDOMContentLoaded()
  }
  // if (location.pathname.includes('favorites.html')) {
  //   await controllerFavorites.handleDOMContentLoaded()
  // }
  // if (location.pathname.includes('product.html')) {
  //   await controllerProduct.handleDOMContentLoaded()
  // }
  // if (location.pathname.includes('cart.html')) {
  //   await controllerCart.handleDOMContentLoaded()
  // }
}
