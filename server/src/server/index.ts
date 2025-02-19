import express, { Request, Response} from "express"
import swaggerUi from "swagger-ui-express";
import router from "../routes";
import morgan from "morgan"
import cors from "cors"




const server = express();
server.use(morgan('tiny'));
server.use(cors());
server.use(express.json());


server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url:"/swagger.json"
        },
    })
)



server.use("/api", router);

server.get("/",(req: Request, res: Response)=>{
    res.redirect("/api")
});

export default server;
