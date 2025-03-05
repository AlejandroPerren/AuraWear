import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

/**
 * Secret key used for JWT verification, retrieved from environment variables.
 * @constant {string | undefined}
 */
const KeyToken: string | undefined = process.env.TOKEN_JSON_KEY;

if (!KeyToken) {
  throw new Error("TOKEN_JSON_KEY is not defined in environment variables");
}

/**
 * Middleware to verify the JWT in the request header.
 *
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * @swagger
 * /protected-endpoint:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Protected endpoint that requires authentication
 *     description: This endpoint requires a valid JWT to access.
 *     responses:
 *       200:
 *         description: Successful access
 *       403:
 *         description: Unauthorized - missing or invalid token
 *
 * @param {Request} req - Incoming request object.
 * @param {Response} res - Response object sent back to the client.
 * @param {NextFunction} next - Function to pass control to the next middleware.
 * @returns {void}
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract the token from the Authorization header
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | null =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  console.log("Received Token:", token);

  // If no token is provided, return an unauthorized error
  if (!token) {
    res.status(403).json({
      authentication: "Missing JWT in request",
      message: "Not authorized to consume this endpoint",
    });
  }

  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token as string, KeyToken);

    // Attach the decoded user data to the request body for further processing
    req.body.user = decoded;

    // Pass control to the next middleware
    next();
  } catch (err) {
    // Handle invalid or expired JWTs
    res.status(403).json({
      authentication: "JWT verification failed",
      message: "Failed to verify JWT in request",
      error: err,
    });
  }
};
