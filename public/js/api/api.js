import { normalizeAttributes } from '../model/utils.js'

const BASE_URL = 'https://web-app.click/pc-shop/api/v0/'
const CURRENCY_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const PRODUCTS_URL = `${BASE_URL}products/`
const URL_AUTHENTICATE = `${BASE_URL}auth`
const DEFAULT_CURRENCY_CODE = 'USD'

let getUrl = (url = BASE_URL) =>
  function subFn(path) {
    return path ? ((url += `${path}/`), subFn) : url
  }

const api = {
  userId: undefined,

  async sendRequest(url, method = 'GET', body = null, withCred = false) {
    const options = {
      method: method,
      credentials: withCred ? 'include' : undefined,
    }
    if (body) {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(body)
    }
    const resp = await fetch(url, options)
    if (resp.status === 204) return
    const json = await resp.json()
    return this.checkSuccess(json)
  },

  checkSuccess(json) {
    if (json.success === true) {
      return json.payload ?? json.userId
    } else if (json.success === undefined) {
      return json
    }
    return null
  },

  async loadCurrency(currencyCode = DEFAULT_CURRENCY_CODE) {
    const currencies = await this.sendRequest(CURRENCY_URL)
    const targetCurrency = currencies.find(
      currency => currency.cc === currencyCode
    )
    return targetCurrency ? targetCurrency.rate : null
  },

  async getCurrencyRate(currencyCode = DEFAULT_CURRENCY_CODE) {
    const currencies = await this.sendRequest(CURRENCY_URL)
    const targetCurrency = currencies.find(
      currency => currency.cc === currencyCode
    )
    return targetCurrency ? targetCurrency.rate : null
  },

  async loadProducts() {
    const products = await this.sendRequest(PRODUCTS_URL)
    return products.map(product => ({
      ...product,
      attributes: normalizeAttributes(product.attributes),
    }))
  },

  async loadProductById(id) {
    return await this.sendRequest(`${PRODUCTS_URL}${id}`)
  },

  async authenticate() {
    this.userId = await this.sendRequest(URL_AUTHENTICATE, 'POST', null, true)
  },

  async getFavoriteProducts() {
    const url = getUrl()('customers')(this.userId)('favorites')()
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postToFavorites(productId) {
    const url = getUrl()('customers')(this.userId)('favorites')()
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteFromFavorites(productId) {
    const url = getUrl()('customers')(this.userId)('favorites')(productId)()
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async getCartProducts() {
    const url = getUrl()('customers')(this.userId)('carts')()
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postProductToCart(productId) {
    const url = getUrl()('customers')(this.userId)('carts')()
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteProductFromCart(productId) {
    const url = getUrl()('customers')(this.userId)('carts')(productId)()
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async getCompareProducts() {
    const url = getUrl()('customers')(this.userId)('compare')()
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postProductToCompare(productId) {
    const url = getUrl()('customers')(this.userId)('compare')()
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteProductFromCompare(productId) {
    const url = getUrl()('customers')(this.userId)('compare')(productId)()
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async loadRecommendedProductsById(productId) {
    const url = getUrl()('customers')(productId)('recomend')()
    const recommendedProducts = await this.sendRequest(url, 'GET', null, true)
    return recommendedProducts.map(product => product.productId)
  },

  async loadWatchedProductsById() {
    const url = getUrl()('customers')(this.userId)('watched')()
    const watchedProducts = await this.sendRequest(url, 'GET', null, true)
    return watchedProducts.map(product => product.productId)
  },

  async loadSimilarProductsById(productId) {
    const url = getUrl()('products')(productId)('similar')()
    const similarProducts = await this.sendRequest(url, 'GET')
    return similarProducts.map(product => product.relatedProductId)
  },
}

export default api
