import { Post, Route, Tags, Body, Get, Delete, Path, Request } from "tsoa";
import { IProductController } from "../interfaces";
import { IFunctionResponse } from "../../types/functions.types";
import { IProduct, ICreateProduct } from "../../types/index.types";
import { createProductORM } from "../../domain/orm/products.orm";

@Route("/api/product")
@Tags("Products")
export class ProductController implements IProductController {
  /**
   * Create a New Product.
   * @param {IProduct} product - Product Data.
   * @returns {Promise<IFunctionResponse<IProduct>>} - The created Category
   */
  @Post()
  public async createProduct(
    product: ICreateProduct
  ): Promise<IFunctionResponse<IProduct>> {
    const { name, description, price, images } = product;

    if (!name || !description || !price || !images || !Array.isArray(images)) {
      return {
        status: 400,
        message: "Missing or invalid required fields",
      };
    }

    try {
      const newProduct = await createProductORM(product);
      return {
        status: 201,
        message: "Product successfully created",
        data: newProduct,
      };
    } catch (error) {
      console.error("Error in Product Controller:", error);
      return {
        status: 500,
        message: "Product creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  public async getAllProducts(): Promise<IFunctionResponse<IProduct[] | null>> {
      
  }

  public async getProductById(id: number): Promise<IFunctionResponse<IProduct[] | null>> {
      
  }

  public async deleteProductById(id: number): Promise<IFunctionResponse<null>> {
      
  }

  public async updateProduct(productId: string, product: IProduct): Promise<IFunctionResponse<ICreateProduct>> {
      
  }



}
