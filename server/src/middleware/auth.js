import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const createJwt = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET
	);

	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'Not authorized !' });
		return;
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		res.status(401);
		res.json({ message: 'You need to create an account ! Invalid token !' });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
		return;
	} catch (e) {
		console.error(e);
		res.status(401);
		res.json({ message: 'You need to create an account ! Invalid token !' });
		return;
	}
};

export const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		res.json({ message: 'Not authorized !' });
	}
};
