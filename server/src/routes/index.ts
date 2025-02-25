import express, { Request, Response } from "express";
import authRouter from "./authRouter";
import { getAllUsersController } from "../controllers/users/UsersController";


const server = express();

const rootRouter = express.Router();

const controller: getAllUsersController = new getAllUsersController();

server.use("/", rootRouter);// http://localhost:8080/api/



server.route("/")
    .get(async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await controller.getAllUsers();

            res.status(200).json({
                status: 200,
                message: "Usuarios obtenidos exitosamente",
                data: response
            });
        } catch (error) {
            console.error("Error in Router: ", error);
            res.status(500).json({
                status: 500,
                message: "Error interno del servidor"
            });
        }
    });




server.use("/auth", authRouter);// http://localhost:8080/api/auth  -->  authRouter



export default server