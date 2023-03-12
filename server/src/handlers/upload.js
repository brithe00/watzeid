import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'uploads/');
	},
	filename: (req, file, callback) => {
		const uniqueSuffix = Date.now() + '' + Math.round(Math.random() * 1e9);
		callback(null, uniqueSuffix);
	},
});

const checkFileType = (file, callback) => {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return callback(null, true);
	} else {
		callback('Images only!');
	}
};

export const upload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	},
});

export const uploadAvatar = (req, res, next) => {
	try {
		res.send(`/${req.file.path}`);
	} catch (e) {
		console.log(e);
		next(e);
	}
};
