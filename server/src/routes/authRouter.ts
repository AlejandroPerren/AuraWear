import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth/registerController";
import { IUser } from "../types/auth.types";

const authRouter = express.Router();

const controller: AuthController = new AuthController();

authRouter.route("/register")
  .post(async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, email, password, address, phone }:IUser = req.body;

      const response = await controller.registerUser({
        name,
        email,
        password,
        address,
        phone,
      });

      if (response && response.status) {
        return res.status(response.status).json(response);
      }

      res.status(500).json({
        message: "Error al registrar el usuario",
        Error,
      });
    } catch (error) {
      console.log("Error in Router" + error);
    }
  });

export default authRouter;
