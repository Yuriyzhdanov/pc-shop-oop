import { normalizeAttributes } from '../model/utils.js'

const BASE_URL = 'https://web-app.click/pc-shop/api/v0/'
const CURRENCY_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const PRODUCTS_URL = `${BASE_URL}products/`
const URL_AUTHENTICATE = `${BASE_URL}auth`
const CUSTOMERS_URL = `${BASE_URL}customers/`
const DEFAULT_CURRENCY_CODE = 'USD'

const getUrlSimilarByProductId = productId => `${PRODUCTS_URL}${id}/similar/`
const getUrlFavoritesByUserId = userId => `${CUSTOMERS_URL}${userId}/favorites/`
const getUrlCartsByUserId = userId => `${CUSTOMERS_URL}${userId}/carts/`

const api = {
  userId: undefined,

  async mySendRequest(url, method = 'GET', body = null, withCred = false) {
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
    const currencies = await this.mySendRequest(CURRENCY_URL)
    const targetCurrency = currencies.find(
      currency => currency.cc === currencyCode
    )
    return targetCurrency ? targetCurrency.rate : null
  },

  async getCurrencyRate(currencyCode = DEFAULT_CURRENCY_CODE) {
    const currencies = await this.mySendRequest(CURRENCY_URL)
    const targetCurrency = currencies.find(
      currency => currency.cc === currencyCode
    )
    return targetCurrency ? targetCurrency.rate : null
  },

  async loadProducts() {
    const products = await this.mySendRequest(PRODUCTS_URL)
    return products.map(product => ({
      ...product,
      attributes: normalizeAttributes(product.attributes),
    }))
  },

  async loadProductById(id) {
    return await this.mySendRequest(`${PRODUCTS_URL}${id}`)
  },

  async authenticate() {
    this.userId = await this.mySendRequest(URL_AUTHENTICATE, 'POST', null, true)
  },

  async getFavoriteProducts() {
    const url = getUrlFavoritesByUserId(this.userId)
    return await this.mySendRequest(url, 'GET', null, true)
  },

  async postToFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId)
    const body = { productId }
    return await this.mySendRequest(url, 'POST', body, true)
  },

  async deleteFromFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId) + productId
    return await this.mySendRequest(url, 'DELETE', null, true)
  },

  async getCartProducts() {
    const url = getUrlCartsByUserId(this.userId)
    return await this.mySendRequest(url, 'GET', null, true)
  },

  async postProductToCart(productId) {
    const url = getUrlCartsByUserId(this.userId)
    const body = { productId }
    return await this.mySendRequest(url, 'POST', body, true)
  },

  async deleteProductFromCart(productId) {
    const url = getUrlCartsByUserId(this.userId) + productId
    return await this.mySendRequest(url, 'DELETE', null, true)
  },

  async loadRecommendedProductsById(id) {
    const url = `${CUSTOMERS_URL}${id}/recomend/`
    const recommendedProducts = await this.mySendRequest(url, 'GET', null, true)
    return recommendedProducts.map(product => product.productId)
  },

  async loadSimilarProductsById(id) {
    const url = getUrlSimilarByProductId(id)
    const similarProducts = await this.mySendRequest(url, 'GET')
    return similarProducts.map(product => product.relatedProductId)
  },
}

export default api
