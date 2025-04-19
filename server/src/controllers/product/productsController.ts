import { Post, Route, Tags, Body, Get, Delete, Path, Request } from "tsoa";
import { IProductController } from "../interfaces";
import { IFunctionResponse } from "../../types/functions.types";
import { IProduct, ICreateProduct, IProductFull } from "../../types/index.types";
import {
  createProductORM,
  deleteProductORM,
  getAllProductsORM,
  getOneProductORM,
  updateProductORM,
} from "../../domain/orm/products.orm";


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
    @Body() product: ICreateProduct
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

  public async getAllProducts(): Promise<IFunctionResponse<IProductFull[] | null>> {
    try {
      const products = await getAllProductsORM();
      return {
        status: 200,
        message: products
          ? "Productos Encontrados"
          : "No se encontraron los productos",
        data: products,
      };
    } catch (error) {
      console.error("Error in Product Controller:", error);
      return {
        status: 500,
        message: "Error pidiendo Productos",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  public async getProductById(
    id: number
  ): Promise<IFunctionResponse<IProductFull | null>> {
    try {
      const product = await getOneProductORM(id);
      return {
        status: 200,
        message: product ? "Producto encontrado" : "Producto no encontrado",
        data: product,
      };
    } catch (error) {
      console.error("Error in Product Controller:", error);
      return {
        status: 500,
        message: "Error Pidiendo el Producto",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  public async deleteProductById(id: number): Promise<IFunctionResponse<null>> {
    try {
      await deleteProductORM(id);
      return {
        status: 200,
        message: "Producto Borrado Correctamente",
      };
    } catch (error) {
      console.error("Error in Product Controller:", error);
      return {
        status: 500,
        message: "Error Eliminando el Producto",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  public async updateProduct(
    productId: number,
    product: ICreateProduct
  ): Promise<IFunctionResponse<IProduct>> {
    if (!product) {
      return {
        status: 400,
        message: "Datos inválidos",
      };
    }
  
    try {
      const updatedProduct = await updateProductORM(productId, product);
  
      if (!updatedProduct) {
        return {
          status: 404,
          message: "Producto no encontrado",
        };
      }
  
      return {
        status: 200,
        message: "Producto actualizado exitosamente",
        data: updatedProduct,
      };
    } catch (error) {
      console.error("Error in Product Controller:", error);
      return {
        status: 500,
        message: "Error editando el producto",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
