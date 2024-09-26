import { normalizeAttributes } from '../model/utils.js'

const BASE_URL = 'https://web-app.click/pc-shop/api/v0/'
const CURRENCY_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const PRODUCTS_URL = `${BASE_URL}products/`
const AUTH_URL = `${BASE_URL}auth`
const CUSTOMERS_URL = `${BASE_URL}customers/`
const USER_ID = 3
const FAVORITES_URL = `${CUSTOMERS_URL}${USER_ID}/favorites/`
const COOKIE_HEADER = { Cookie: 'session=ff0099aa' }
const JSON_HEADERS = { 'Content-Type': 'application/json' }
const DEFAULT_CURRENCY_CODE = 'USD'

const api = {
  userId: USER_ID,

  SIMILAR(id) {
    return `${PRODUCTS_URL}${id}/similar`
  },

  async sendRequest(url, options = {}) {
    const resp = await fetch(url, options)
    if (resp.status === 204) return

    const json = await resp.json()
    return this.checkSuccess(json)
  },

  async sendRequestWithCred(url, options = {}) {
    return await this.sendRequest(url, { credentials: 'include', ...options })
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
    return targetCurrency.rate
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

  async loadAuth() {
    return await this.sendRequestWithCred(AUTH_URL)
  },

  async getFavoriteProducts() {
    return await this.sendRequestWithCred(FAVORITES_URL, {
      headers: COOKIE_HEADER,
    })
  },

  async modifyFavorites(productId, method) {
    const url =
      method === 'POST' ? FAVORITES_URL : `${FAVORITES_URL}${productId}`
    const options = {
      method,
      body: method === 'POST' ? JSON.stringify({ productId }) : null,
      headers: { ...COOKIE_HEADER, ...JSON_HEADERS },
    }
    return await this.sendRequestWithCred(url, options)
  },

  async postToFavorites(productId) {
    return await this.modifyFavorites(productId, 'POST')
  },

  async deleteFromFavorites(productId) {
    return await this.modifyFavorites(productId, 'DELETE')
  },

  async loadRecommendedProductsById(id) {
    const recommendedProducts = await this.sendRequestWithCred(
      `${CUSTOMERS_URL}${id}/recomend/`
    )
    return recommendedProducts.map(product => product.productId)
  },

  async loadSimilarProductsById(id) {
    const similarProducts = await this.sendRequest(this.SIMILAR(id))
    return similarProducts.map(product => product.relatedProductId)
  },

  async updateUserId() {
    const userData = await this.sendRequest(`${CUSTOMERS_URL}${this.userId}`)
    this.userId = userData.id
  },
}

export default api
