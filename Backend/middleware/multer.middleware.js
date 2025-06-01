import multer from "multer";

const storage = multer.diskStorage({}); // no local storage required;

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Please upload an image file"), false);
	}
};
export default multer({ storage, fileFilter });