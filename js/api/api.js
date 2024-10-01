import { normalizeAttributes } from '../model/utils.js'

const BASE_URL = 'https://web-app.click/pc-shop/api/v0/'
const CURRENCY_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const PRODUCTS_URL = `${BASE_URL}products/`
const URL_AUTHENTICATE = `${BASE_URL}auth`
const CUSTOMERS_URL = `${BASE_URL}customers/`
const DEFAULT_CURRENCY_CODE = 'USD'

const getUrlSimilarByProductId = productId =>
  `${PRODUCTS_URL}${productId}/similar/`
const getUrlCartsByUserId = userId => `${CUSTOMERS_URL}${userId}/carts/`
const getUrlFavoritesByUserId = userId => `${CUSTOMERS_URL}${userId}/favorites/`
const getUrlCompareByUserId = userId => `${CUSTOMERS_URL}${userId}/compare/`
const getUrlRecomendByUserId = userId => `${CUSTOMERS_URL}${userId}/recomend/`
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
    const url = getUrlFavoritesByUserId(this.userId)
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postToFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId)
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteFromFavorites(productId) {
    const url = getUrlFavoritesByUserId(this.userId) + productId
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async getCartProducts() {
    const url = getUrlCartsByUserId(this.userId)
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postProductToCart(productId) {
    const url = getUrlCartsByUserId(this.userId)
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteProductFromCart(productId) {
    const url = getUrlCartsByUserId(this.userId) + productId
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async getCompareProducts() {
    const url = getUrlCompareByUserId(this.userId)
    return await this.sendRequest(url, 'GET', null, true)
  },

  async postProductToCompare(productId) {
    const url = getUrlCompareByUserId(this.userId)
    const body = { productId }
    return await this.sendRequest(url, 'POST', body, true)
  },

  async deleteProductFromCompare(productId) {
    const url = getUrlCompareByUserId(this.userId) + productId
    return await this.sendRequest(url, 'DELETE', null, true)
  },

  async loadRecommendedProductsById(id) {
    const url = getUrlRecomendByUserId(id)
    const recommendedProducts = await this.sendRequest(url, 'GET', null, true)
    return recommendedProducts.map(product => product.productId)
  },

  async loadSimilarProductsById(id) {
    const url = getUrlSimilarByProductId(id)
    const similarProducts = await this.sendRequest(url, 'GET')
    return similarProducts.map(product => product.relatedProductId)
  },
}

export default api
