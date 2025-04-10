import { Post, Route, Tags, Body, Get, Delete, Path, Request } from "tsoa";
import { IProductController } from "../interfaces";
import { IFunctionResponse } from "../../types/functions.types";
import { IProduct, ICreateProduct } from "../../types/index.types";
import { createProductORM } from "../../domain/orm/products.orm";
import cloudinary from "../../config/cloudinary";
import fs from "fs/promises";
import path from "path";
import { uploadImagesToCloudinary } from "../utils/uploadImagesToCloudinary";

@Route("/api/product")
@Tags("Products")
export class ProductController implements IProductController {
  /**
   * Create a New Product.
   * @param {IProduct} product - Product Data.
   * @returns {Promise<IFunctionResponse<ICategory>>} - The created Category
   */
  @Post()
  public async createProduct(
    @Request() req: any
  ): Promise<IFunctionResponse<ICreateProduct>> {
    try {
      const files = req.files as Express.Multer.File[];
      const body = req.body;

      if (!files || files.length === 0) {
        return { status: 400, message: "Se requieren imágenes" };
      }

      const imageUrls = await uploadImagesToCloudinary(files);

      const productData: ICreateProduct = {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        categoryIds: body.categoryIds,
        images: imageUrls,
      };

      const response = await createProductORM(productData);

      return {
        status: 200,
        message: "Producto creado correctamente",
        data: response,
      };
    } catch (error) {
      console.error("Error al crear producto:", error);
      return {
        status: 500,
        message: "Error en el servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
