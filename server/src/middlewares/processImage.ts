import { Request, Response, NextFunction } from "express";

export const processImages = (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      req.body.images = [];
    } else {
      req.body.images = files.map((file) => file.path);
    }

    next();
  } catch (error) {
    console.error("Error processing images:", error);
    res.status(500).json({
      status: 500,
      message: "Error processing images",
    });
  }
};
