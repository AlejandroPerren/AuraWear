import express, { Request, Response } from "express";
import authRouter from "./authRouter";
import { UsersController } from "../controllers/users/UsersController";



const server = express();

const rootRouter = express.Router();

const controller: UsersController = new UsersController();

server.use("/", rootRouter);// http://localhost:8080/api/



server.route("/")
.get(async(req: Request, res: Response): Promise<any> =>{
    try {
        const response = await controller.getAllUsers()
        
        if (response && response.status) {
            return res.status(response.status).json(response);
          }
    
          res.status(500).json({
            message: "Error al buscar usuarios",
            Error,
          });
        } catch (error) {
          console.log("Error in Router" + error);
        }
})





server.use("/auth", authRouter);// http://localhost:8080/api/auth  -->  authRouter



export default server