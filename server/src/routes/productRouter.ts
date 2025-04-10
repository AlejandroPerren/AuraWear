import express from "express";
import { processImages } from "../middlewares/processImage";
import upload from "../config/multer";
import { ProductController } from "../controllers/product/productsController";


const productRouter = express.Router();
const controller: ProductController = new ProductController();


productRouter.post(
  "/",
  upload.array("images"), 
  processImages,         
  async (req, res) => {
    try {
      const product = req.body;
      const response = await controller.createProduct(product);

      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in product route:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

export default productRouter;
