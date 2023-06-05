import { Router } from "express";
import productService from "../dao/services/product.service.js";

const productRouter = Router();

//---------- CRUD----------

// C: create
productRouter.post("/", async (req, res) => {
    const product = await productService.addProduct(req.body);
  try {
    res.status(201).send(product);
  } catch (err) {
    res.status(404).send({ ERROR: err });
  }
});
// R: read
productRouter.get("/", async (req, res) => {
    const products = await productService.getProducts();
    try {
       res.send(products)
    } catch (err) {
      res.status(500).send({ ERROR: err });
    }
  });
// U: update
productRouter.put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const products = await productService.updateProduct(pid, req.body);
    try {
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ ERROR: err });
    }
  });
// D: delete
productRouter.delete("/:pid", async (req, res) => {
const pid = req.params.pid;
const products = await productService.deleteProduct(pid);
    try {
        res.status(204).send(products)
    } catch (err) {
      res.status(500).send({ ERROR: err });
    }
  });

export default productRouter;
