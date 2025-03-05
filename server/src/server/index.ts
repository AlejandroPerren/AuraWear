import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import router from "../routes";
import morgan from "morgan";
import cors from "cors";

const server = express();

//security options
const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"] 
};


// Middleware for logging requests
server.use(morgan("tiny"));

// Enable CORS for handling cross-origin requests
server.use(cors(corsOptions));

// Parse incoming JSON requests
server.use(express.json());

//Static Server
server.use(express.static('public'));

// Serve API documentation using Swagger UI
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
      explorer: true
    },
  })
);

// Main API routes
server.use("/api", router);

// Redirect root requests to the API
server.get("/", (req: Request, res: Response) => {
  res.redirect("/api");
});

export default server;
