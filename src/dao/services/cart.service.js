import { cartModel } from "../models/cart.model.js";
import productService from "./product.service.js";

class CartService{
    constructor(){
        this.model = cartModel;
    }
//----- CRUD -----
// C: Create
async addCart(cart){
    cart.products =[];
    return await this.model.create(cart);
}

async addProdInCart(pid, cid){
    const cart = await this.model.findOne({ _id: cid }); // obtengo el cart
    const product = await productService.getProductById(pid); //obtengo el id del prod
    cart.products.push(product); // agrego el producto en la lista vacía de productos en el cart.
    return await cart.save(); //retorno el cart actualziado 
}

// R: Read
async getCarts(){
    return await this.model.find();
}

// D: Delete
async deleteCart(cid){
    return await this.model.deleteOne({ _id:cid })
}
}

 const cartService = new CartService();
 export default cartService;