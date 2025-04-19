import { PrismaClient } from "../../../generated/prisma";
import {
  ICreateProduct,
  IProduct,
  IProductFull,
} from "../../types/index.types";

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
    const price = Number(product.price);
    const stock = Number(product.stock) || 0;
    const categoryIds = product.categoryIds?.map((id) => Number(id)) || [];

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price,
        stock,
        images: product.images
          ? {
              create: product.images.map((url) => ({ url })),
            }
          : undefined,
        categories:
          categoryIds.length > 0
            ? {
                create: categoryIds.map((id) => ({
                  category: {
                    connect: { id },
                  },
                })),
              }
            : undefined,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return newProduct;
  } catch (error: any) {
    throw new Error(`Error al crear el producto: ${error}`);
  }
};

export const getAllProductsORM = async (): Promise<IProductFull[] | null> => {
  try {
    const response = await prisma.product.findMany({
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
        orderDetails: true,
      },
    });
    return response.length > 0 ? response : null;
  } catch (error) {
    throw new Error("Error in ORM" + error);
  }
};

export const getOneProductORM = async (
  id: number
): Promise<IProductFull | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
        orderDetails: true,
      },
    });
    return product || null;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};

export const deleteProductORM = async (id: number): Promise<null> => {
  try {
    await prisma.product.delete({
      where: { id },
    });
    return null;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};

export const updateProductORM = async (id: number, product: ICreateProduct) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock || 0,
      },
    });

    if (product.images) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      await prisma.productImage.createMany({
        data: product.images.map((url) => ({
          url,
          productId: id,
        })),
      });
    }

    if (product.categoryIds && product.categoryIds.length > 0) {
      await prisma.productCategory.deleteMany({
        where: { productId: id },
      });

      await prisma.productCategory.createMany({
        data: product.categoryIds.map((categoryId) => ({
          productId: id,
          categoryId,
        })),
      });
    }

    const result = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error);
  }
};
