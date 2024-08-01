import Product from './Product.class.js'

class Catalog {
  constructor(search, attrSelector, priceRanger, sorter, paginator) {
    this.products = []
    this.search = search
    this.attrSelector = attrSelector
    this.priceRanger = priceRanger
    this.sorter = sorter
    this.paginator = paginator
  }

  computeProducts() {
    const searched = this.search.run(this.products)
    console.log(searched)
    const attributed = this.attrSelector.run(searched)
    const priced = this.priceRanger.run(attributed)
    console.log(attributed)
    const sorted = this.sorter.run(priced)
    return this.paginator.run(sorted)
  }

  getCaptions() {
    return this.products.map(product => product.caption)
  }

  addProducts(products, ???) {
    products.forEach(this.addProduct.bind(this))
  }

  addProduct(product) {
    const createdProduct = new Product(product)
    createdProduct.convertPrice(???)
    this.products.push(createdProduct)
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  clear() {
    this.products = []
  }
}
export default Catalog
