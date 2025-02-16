import express, {Request, Response} from "express"



const authRouter = express.Router();



authRouter.route("/test")
    .get((req, res) =>{
        console.log("Hola")
    })


export default authRouter;