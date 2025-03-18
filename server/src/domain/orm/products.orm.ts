import { PrismaClient, Prisma } from "@prisma/client";
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
          price: new Prisma.Decimal(product.price), 
          stock: product.stock || 0,
          categoryId: product.categoryId ,
          images: product.images
            ? { create: product.images.map((img: string) => ({ url: img })) }
            : undefined, 
        },
        include: {
          images: true,
        },
      });
  
      return newProduct;
    } catch (error) {
        throw new Error("Error in ORM " + error);
      }
  };