import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth/authController";
import { TRegister, TLogin } from "../types/auth.types";
import { token } from "morgan";

const authRouter = express.Router();

const controller: AuthController = new AuthController();

authRouter
  .route("/register")
  .post(async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, address, phone }: TRegister = req.body;

      const response = await controller.registerUser({
        name,
        email,
        password,
        address,
        phone,
      });

      if (response && response.status) {
        res.status(response.status).json(response);
        return;
      }

      res.status(500).json({
        status: 500,
        message: "Error al registrar el usuario",
      });
    } catch (error) {
      console.error("Error in Router:", error);
      res.status(500).json({
        status: 500,
        message: "Error interno del servidor",
      });
    }
  });

authRouter
  .route("/login")
  .post(async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: TLogin = req.body;

      const response = await controller.loginUser({
        email,
        password,
      });

      if (response && response.status) {
        res.status(response.status).json(response);
        return;
      }

      res.status(500).json({
        status: 500,
        message: "Error al Ingresar el usuario",
        token: token
      });
    } catch (error) {
      console.error("Error in Router:", error);
      res.status(500).json({
        status: 500,
        message: "Error interno del servidor",
      });
    }
  });

export default authRouter;
