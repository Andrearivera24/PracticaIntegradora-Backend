import { Router } from "express";
import cartService from "../dao/services/cart.service.js";
const cartRouter = Router();

// C: Create
cartRouter.post('/', async (req, res)=>{
const cart = req.body;
const cartAdded = await cartService.addCart(cart);
try {
    res.status(201).send(cartAdded);
    
} catch (err) {
    res.status(500).send({ERROR: err});
}
});


// agregar producto (pid) en cart (cid)
cartRouter.post('/:cid', async (req, res)=>{
const cid = req.params.cid;
const pid = req.body.pid;
const cartAdded = await cartService.addProdInCart(pid, cid);

    try {
        res.status(201).send(cartAdded);
        
    } catch (err) {
        res.status(500).send({ERROR: err});
    }
    });

// R: Read
cartRouter.get('/', async (req, res)=>{
const carts = await cartService.getCarts()
    try {
        res.send(carts);
        
    } catch (err) {
        res.status(404).send({ERROR: err});
    }
    });


// D: Delete
cartRouter.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const carts = await cartService.deleteCart(cid);
        try {
            res.status(204).send(carts);
            
        } catch (err) {
            res.status(404).send({ERROR: err});
        }
        });


export default cartRouter;