import express, { Request, Response} from "express"
import swaggerUi from "swagger-ui-express";
import Router from "./routes";


const PORT = 8000

//descargar y configuar Morgan, Eslint, Jest
const server = express();


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