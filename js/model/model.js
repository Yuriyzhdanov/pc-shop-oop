import api from '../api/api.js'
import Shop from './Shop.class.js'

const modelShop = new Shop(api)

// async function testFavorite() {
//   const favorite = new Favorite(api)
//   console.log('model favorite', favorite)
// }
// testFavorite()

window.modelShop = modelShop

export default modelShop
