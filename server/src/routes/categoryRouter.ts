import express, { Request, Response } from "express";

import { ICategory } from "../types/index.types";
import { CategoryController } from "../controllers/category/categoryController";

const categoryRouter = express.Router();
const controller: CategoryController = new CategoryController();


categoryRouter.post(
    "/",
    async(req: Request, res: Response): Promise<void> =>{
        try {
            const {name}: ICategory = req.body;
            const response = await controller.createCategory({
                name
            })
            if (response && response.status) {
                res.status(response.status).json(response);
                return;
              }
        
              res.status(500).json({
                status: 500,
                message: "Error create the category",
              });
        } catch (error) {
            console.error("Error in Router:", error);
            res.status(500).json({
              status: 500,
              message: "Internal server error",
            });
        }
    }
    )
    .get("/",
        async (req: Request, res: Response): Promise<void> => {
            try {
                const response = await controller.getAllCategories();
                
                if (response && response.status) {
                    res.status(response.status).json(response);
                    return;
                  }
              
                  res.status(500).json({
                    message: "Error retrieving categories",
                  });
            } catch (error) {
                console.error("Error in Router:", error);
                res.status(500).json({
                  message: "Internal server error",
                });
            }
        }
    )
    .delete("/:id",
        async (req: Request, res: Response): Promise<void> =>{
            try {
                const id = req.params.id;
                const numberId = Number(id);
                console.log(numberId);
                const response = await controller.deleteCategory(numberId);
                if (response && response.status) {
                    res.status(response.status).json(response);
                    return;
                  }
              
                  res.status(500).json({
                    message: "Error retrieving users",
                  });    
                
            } catch (error) {
                console.error("Error in Router:", error);
                res.status(500).json({
                  message: "Internal server error",
                });
            }
        }
    )

export default categoryRouter;