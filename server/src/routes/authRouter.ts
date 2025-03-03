import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth/authController";
import { IRegister } from "../types/auth.types";

const authRouter = express.Router();

const controller: AuthController = new AuthController();

authRouter.route("/register")
  .post(async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, address, phone }: IRegister = req.body;

    const response = await controller.registerUser({ name, email, password, address, phone });

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




export default authRouter;
