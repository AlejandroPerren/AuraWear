import { PrismaClient } from "../../../generated/prisma";
import { ICreateProduct } from "../../types/index.types";

const prisma = new PrismaClient();

/**
 * Create a new Product in the Database.
 *
 * @param {ICreateProduct} product - the data to be created.
 * @returns {Promise<ICreateProduct>} the newly created product.
 * @throws {Error} If there is an issue creating the product.
 */
export const createProductORM = async (product: ICreateProduct) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock || 0,
        images: product.images
          ? {
              create: product.images.map((url) => ({ url })),
            }
          : undefined,
        categories: product.categoryIds && product.categoryIds.length > 0
          ? {
              create: product.categoryIds.map((categoryId) => ({
                category: {
                  connect: { id: categoryId },
                },
              })),
            }
          : undefined, 
      },
      include: {
        images: true,
      },
    });
    
    if (product.categoryIds && product.categoryIds.length > 0) {
      await prisma.productCategory.createMany({
        data: product.categoryIds.map((catId) => ({
          productId: newProduct.id,
          categoryId: catId,
        })),
      });
    }

    return newProduct;
  } catch (error) {
    throw new Error("Error al crear el producto: " + error);
  }
};