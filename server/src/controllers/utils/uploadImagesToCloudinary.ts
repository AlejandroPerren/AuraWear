import cloudinary from "../../config/cloudinary";
import fs from "fs/promises";

export const uploadImagesToCloudinary = async (files: Express.Multer.File[], folder = "products"): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, { folder });
    urls.push(result.secure_url);
    await fs.unlink(file.path);
  }

  return urls;
};
