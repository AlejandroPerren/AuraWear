import express, { Request, Response} from "express"
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import morgan from "morgan"
import cors from "cors"

const PORT = 8000


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



server.use(Router);

server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });