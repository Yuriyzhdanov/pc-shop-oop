import viewProduct from '../view/viewProduct.js'
import modelShop from '../model/model.js'

const controllerProduct = {
  async handleDOMContentLoaded() {
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    await modelShop.init()
    const product = modelShop.catalog.products.find(p => p.id === +productId)
    this.handleShowProduct(product)
    this.handleShowRecommendedProducts()
    this.handleShowSimilarProducts(productId)
  },

  handleShowProduct(product) {
    viewProduct.renderProductInfo(product)
  },

  async handleShowRecommendedProducts() {
    await modelShop.catalog.updateRecomendProd()
    viewProduct.renderRecomendProd(modelShop.catalog.recommendedProducts)
  },

  async handleShowSimilarProducts(productId) {
    await modelShop.catalog.updateSimilarProd(productId)
    viewProduct.renderSimilarProd(modelShop.catalog.similarProducts)
  },
}

export default controllerProduct
