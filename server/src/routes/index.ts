import express from "express"
import authRouter from "./authRouter";


const server = express();

const rootRouter = express.Router();


server.use("/", rootRouter);// http://localhost:8080/api/

server.use("auth", authRouter);// http://localhost:8080/api/auth  -->  authRouter



export default server