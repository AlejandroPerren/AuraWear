import { PrismaClient } from "../../../generated/prisma";
import { ICreateProduct, IProduct } from "../../types/index.types";

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
        categories:
          product.categoryIds && product.categoryIds.length > 0
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

export const getAllProductsORM = async (): Promise<IProduct[] | null> => {
  try {
    const response = await prisma.product.findMany();
    return response.length > 0 ? response : null;
  } catch (error) {
    throw new Error("Error in ORM" + error);
  }
};

export const getOneProductORM = async (
  id: number
): Promise<IProduct | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
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
