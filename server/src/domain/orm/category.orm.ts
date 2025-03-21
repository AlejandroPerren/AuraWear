import { PrismaClient } from "@prisma/client";
import { ICategory } from "../../types/index.types";

const prisma = new PrismaClient();

/**
 * Create a new category in the Database.
 *
 * @param {string} category - the data to be created.
 * @returns {Promise<string>} the newly created category.
 * @throws {Error} If there is an issue creating the category.
 */

export const createCategoryORM = async (category: ICategory): Promise<ICategory>=>{
    try {
        const newCategory = await prisma.category.create({
            data: category
        })
        return newCategory;
    }catch (error) {
        throw new Error("Error in ORM " + error);
      }
}

export const getAllCategoriesORM = async (): Promise<ICategory[] | null> =>{
    try {
        const response = await prisma.category.findMany();
        return response.length > 0 ? response : null
    } catch (error) {
        throw new Error("Error in ORM " + error);
    }
}

export const deleteCategoryByIdORM = async (id: number): Promise<null> =>{
    try {
        await prisma.category.delete({
            where: {id},
        });
        return null
    } catch (error) {
        throw new Error("Error in ORM " + error);
    }
};
