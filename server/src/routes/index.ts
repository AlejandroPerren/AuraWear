import express, { Request, Response } from "express";
import authRouter from "./authRouter";
import { UsersController } from "../controllers/users/UsersController";
import userRouter from "./userRoute";
import categoryRouter from "./categoryRouter";

const server = express();
const rootRouter = express.Router();
const controller: UsersController = new UsersController();

// Root API route to retrieve all users
server.get("/", async (req: Request, res: Response): Promise<void> => {
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
});

// Authentication routes
server.use("/auth", authRouter); // Routes under `/auth`

// Users Routes
server.use("/users", userRouter);

// Category Routes
server.use("/category", categoryRouter);


export default server;
