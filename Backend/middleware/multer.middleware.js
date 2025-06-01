import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Please upload an image file"), false);
	}
};
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
	},
});
