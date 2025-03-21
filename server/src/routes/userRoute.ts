import express, {Request, Response} from "express"
import { UsersController } from "../controllers/users/UsersController"


const userRouter = express.Router()
const controller: UsersController = new UsersController();

/**
 * Route of management Users
 */

userRouter
    .get(
    "/",
    async (req: Request, res: Response): Promise<void> =>{
        try {
            const {email} = req.body
            const response = await controller.getOneUserByEmail(email)

            if (response && response.status) {
                res.status(response.status).json(response);
                return;
              }

            res.status(500).json({
                status: 500,
                message: "Error Delete user",
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
    .get("/", async (req: Request, res: Response): Promise<void> => {
      try {
        const response = await controller.getAllUsers();
    
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
    })
    .delete("/:id", async (req: Request, res: Response): Promise<void> =>{
        try {
            const id = req.params.id;
            const numberId = Number(id)
            console.log(numberId)
            const response = await controller.deleteUserByID(numberId);
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
    });

export default userRouter;