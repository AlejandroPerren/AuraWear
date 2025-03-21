import { Post, Route, Tags, Body, Get, Delete, Path } from "tsoa";
import { ICategoryController } from "../interfaces";
import { IFunctionResponse } from "../../types/functions.types";
import { ICategory } from "../../types/index.types";
import { createCategoryORM, deleteCategoryByIdORM, getAllCategoriesORM } from "../../domain/orm/category.orm";

@Route("/api/category")
@Tags("Category")
export class CategoryController implements ICategoryController {
  /**
   * Creates a new category.
   * @param {ICategory} category - Category data.
   * @returns {Promise<IFunctionResponse<ICategory>>} - The created category.
   */
  @Post()
  public async createCategory(
    @Body() category: ICategory
  ): Promise<IFunctionResponse<ICategory>> {
    if (!category) {
      return { status: 400, message: "Invalid Data" };
    }

    try {
      const response = await createCategoryORM(category);
      return {
        status: 200,
        message: "Category successfully created",
        data: response,
      };
    } catch (error) {
      console.error("Error in category Controller", error);
      return {
        status: 500,
        message: "Category creation error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Retrieves all categories.
   * @returns {Promise<IFunctionResponse<ICategory[] | null>>} 
   */
  @Get()
  public async getAllCategories(): Promise<IFunctionResponse<ICategory[] | null>> {
    try {
      const categories = await getAllCategoriesORM();
      return {
        status: 200,
        message: categories ? "Categories Found" : "No Categories Found",
        data: categories,
      };
    } catch (error) {
      console.error("Error in category Controller", error);
      return {
        status: 500,
        message: "Get All Category error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Deletes a category by ID.
   * @param {number} id - Category ID.
   * @returns {Promise<IFunctionResponse<null>>} - Status of the deletion.
   */
  @Delete("{id}")
  public async deleteCategory(@Path() id: number): Promise<IFunctionResponse<null>> {
    try {
      await deleteCategoryByIdORM(id);
      return {
        status: 200,
        message: "Category Deleted",
      };
    } catch (error) {
      console.error("Error in category Controller", error);
      return {
        status: 500,
        message: "Error Deleting Category",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
