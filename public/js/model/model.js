import api from '../api/api.js'
import Shop from './Shop.class.js'

const modelShop = new Shop(api)

window.modelShop = modelShop

export default modelShop
