import express, { Request, Response } from "express";
import { processImages } from "../middlewares/processImage";
import upload from "../config/multer";
import { ProductController } from "../controllers/product/productsController";
import { ICreateProduct } from "../types/index.types";

const productRouter = express.Router();
const controller: ProductController = new ProductController();

productRouter
  .post(
    "/",
    upload.array("images"),
    processImages,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const product: ICreateProduct = req.body;
        if (
          !product ||
          !product.name ||
          !product.description ||
          !product.price
        ) {
          res.status(400).json({
            status: 400,
            message: "Missing or invalid required fields",
          });
          return;
        }

        const response = await controller.createProduct(product);

        if (response && response.status) {
          res.status(response.status).json(response);
          return;
        }

        res.status(500).json({
          status: 500,
          message: "Error creating the product",
        });
      } catch (error) {
        console.error("Error in product route:", error);
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
    }
  )

  .get("/", async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await controller.getAllProducts();
      if (response && response.status) {
        res.status(response.status).json(response);
        return;
      }

      res.status(500).json({
        message: "Error retrieving products",
      });
    } catch (error) {
      console.error("Error in product route:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  })
  .get("/:id", async (req: Request, res: Response): Promise<void> => {
    const productId = Number(req.params.id);
    try {
      const response = await controller.getProductById(productId);

      if (response && response.status) {
        res.status(response.status).json(response);
        return;
      }

      res.status(404).json({
        message: "Product not found",
      });
    } catch (error) {
      console.error("Error in product route:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  })

  .put(
    "/:id",
    upload.array("images"),
    processImages,
    async (req: Request, res: Response): Promise<void> => {
      const productId = Number(req.params.id);
      const product: ICreateProduct = req.body;

      try {
        const response = await controller.updateProduct(productId, product);

        if (response && response.status) {
          res.status(response.status).json(response);
          return;
        }

        res.status(500).json({
          status: 500,
          message: "Error updating the product",
        });
      } catch (error) {
        console.error("Error in product route:", error);
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
    }
  )

  .delete("/:id", async (req: Request, res: Response): Promise<void> => {
    const productId = Number(req.params.id);
    try {
      const response = await controller.deleteProductById(productId);

      if (response && response.status) {
        res.status(response.status).json(response);
        return;
      }

      res.status(500).json({
        status: 500,
        message: "Error deleting the product",
      });
    } catch (error) {
      console.error("Error in product route:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  });

export default productRouter;
