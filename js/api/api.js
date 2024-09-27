import { normalizeAttributes } from '../model/utils.js'

const BASE_URL = 'https://web-app.click/pc-shop/api/v0/'
const CURRENCY_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const PRODUCTS_URL = `${BASE_URL}products/`
const URL_AUTHENTICATE = `${BASE_URL}auth`
const CUSTOMERS_URL = `${BASE_URL}customers/`
const USER_ID = 3
const FAVORITES_URL = `${CUSTOMERS_URL}${USER_ID}/favorites/`
const CARTS_URL = `${CUSTOMERS_URL}${USER_ID}/carts/`
const COOKIE_HEADER = { Cookie: 'session=1ff0099aa' }
const JSON_HEADERS = { 'Content-Type': 'application/json' }
const DEFAULT_CURRENCY_CODE = 'USD'

const getUrlSimilarByProductId = productId => `${PRODUCTS_URL}${id}/similar/`

const getUrlFavoritesByUserId = userId => `${CUSTOMERS_URL}${userId}/favorites/`
const getUrlCartsByUserId = userId => `${CUSTOMERS_URL}${userId}/carts/`

const api = {
  userId: undefined,

  async sendRequest(url, options = {}, withCred = false) {
    if (withCred) {
      // options = { credentials: 'include', ...options }
      Object.assing(options, { credentials: 'include' })
    }

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

  async authenticate() {
    this.userId = await this.sendRequest(URL_AUTHENTICATE)
  },

  async getFavoriteProducts() {
    const url = getUrlFavoritesByUserId(this.userId)
    return await this.sendRequestWithCred(url, {
      headers: COOKIE_HEADER,
    })
  },

  async postToFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId)
    const options = {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: { ...COOKIE_HEADER, ...JSON_HEADERS },
    }
    return await this.sendRequestWithCred(url, options)
  },

  async deleteFromFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId) + productId
    const options = {
      method: 'DELETE',
      headers: COOKIE_HEADER,
    }
    return await this.sendRequestWithCred(url, options)
  },

  async getCartProducts() {
    return await this.sendRequestWithCred(CARTS_URL, {
      headers: COOKIE_HEADER,
    })
  },

  async addProductToCart(productId) {
    const url = CARTS_URL
    const options = {
      method: 'POST',
      body: JSON.stringify({ productId, quantity: 1 }),
      headers: { ...COOKIE_HEADER, ...JSON_HEADERS },
    }
    return await this.sendRequestWithCred(url, options)
  },

  async removeProductFromCart(productId) {
    const url = `${CARTS_URL}${productId}`
    const options = {
      method: 'DELETE',
      headers: { ...COOKIE_HEADER, ...JSON_HEADERS },
    }
    return await this.sendRequestWithCred(url, options)
  },

  async loadRecommendedProductsById(id) {
    const recommendedProducts = await this.sendRequestWithCred(
      `${CUSTOMERS_URL}${id}/recomend/`,
      { headers: COOKIE_HEADER }
    )
    return recommendedProducts.map(product => product.productId)
  },

  async loadSimilarProductsById(id) {
    const url = getUrlSimilarByProductId(id)
    const similarProducts = await this.sendRequest(url)
    return similarProducts.map(product => product.relatedProductId)
  },
}

export default api
