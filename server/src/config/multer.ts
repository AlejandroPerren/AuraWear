import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "real-estate",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as { folder: string; allowed_formats: string[] },
});

const upload = multer({ storage });

export default upload;
