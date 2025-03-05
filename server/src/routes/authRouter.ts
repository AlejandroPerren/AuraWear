import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth/authController";
import { TRegister, TLogin } from "../types/auth.types";

const authRouter = express.Router();
const controller: AuthController = new AuthController();

/**
 * Route for user registration
 * Handles the creation of a new user by receiving user data.
 */
authRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
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
        message: "Error registering the user",
      });
    } catch (error) {
      console.error("Error in Router:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

/**
 * Route for user login
 * Handles user authentication and returns a JWT if successful.
 */
authRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
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
        message: "Error logging in",
      });
    } catch (error) {
      console.error("Error in Router:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

export default authRouter;
