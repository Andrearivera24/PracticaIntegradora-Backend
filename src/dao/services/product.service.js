import { productModel } from "../models/product.model.js";

class ProductService {
  constructor() {
    this.model = productModel;
  }

  //---------- CRUD----------
  // C: create
  async addProduct(product) {
    return await this.model.create(product);
  }
  // R: read
  async getProducts() {
    return await this.model.find();
  }
  // U: update
  async updateProduct(pid, product) {
    return await this.model.updateOne({ _id: pid }, product);
  }
  // D: delete
  async deleteProduct(pid){
    return await this.model.deleteOne({_id:pid});
  }
  //--------------------------------
  async getProductById(pid){
    return await this.model.findOne({_id:pid});
  }


}

const productService = new ProductService();
export default productService;
