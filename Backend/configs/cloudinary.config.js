import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "meshmind",
		allowed_formats: ["jpg", "png", "jpeg", "webp"],
		public_id: (req, file) => `${Date.now()}-${file.originalname}`,
	},
});
export { cloudinary, storage };
