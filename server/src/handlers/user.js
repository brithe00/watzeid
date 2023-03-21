import prisma from '../config/db.js';
import {
	hashPassword,
	comparePasswords,
	createJwt,
} from '../middleware/auth.js';

// @desc    Register the user
// @route   POST /register
// @access  Public
export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	const alreadyExistsUsername = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	const alreadyExistsEmail = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	const forbiddenNames = [
		'post',
		'posts',
		'likes',
		'users',
		'profile',
		'register',
		'login',
		'comments',
		'new',
	];

	try {
		if (alreadyExistsUsername || alreadyExistsEmail) {
			res.status(400);
			res.json({ message: 'Username or Email already taken !' });
		} else if (forbiddenNames.includes(username)) {
			res.status(400);
			res.json({ message: 'Username or Email already taken !' });
		} else if (password.length < 8) {
			res.status(422);
			res.json({ message: 'Password is too short ! (min. 8 characters)' });
		} else if (!email.includes('@')) {
			res.status(400);
			res.json({ message: 'Invalid email ! (@)' });
		} else if (username.includes('@')) {
			res.status(400);
			res.json({ message: 'Username cannot include @ !' });
		} else {
			const user = await prisma.user.create({
				data: {
					email: email.toLowerCase(),
					username: username.toLowerCase(),
					password: await hashPassword(password),
				},
			});

			const setName = await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: user.username,
				},
			});

			const token = createJwt(user);

			res.json({ token });
		}
	} catch (e) {
		e.type = 'input';
		next(e);
	}
};

// @desc    Login the user
// @route   POST /login
// @access  Public
export const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			res.status(404);
			res.json({ message: 'User not found !' });
		}

		const isValid = await comparePasswords(password, user.password);

		if (!isValid) {
			res.status(404);
			res.json({ message: 'Invalid informations !' });
			return;
		}

		const token = createJwt(user);

		res.json({ token });
	} catch (e) {
		e.type = 'input';
	}
};

// @desc    Get logged user informations
// @route   GET /api/me
// @access  Private
export const me = async (req, res) => {
	const { id } = req.user;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			res.status(404);
			res.json({ message: 'User not found !' });
		}

		res.json({ user });
	} catch (e) {
		e.type = 'input';
	}
};

// @desc    Update my informations
// @route   PUT /api/me
// @access  Private
export const updateMe = async (req, res) => {
	const { name, profilePicture, bio } = req.body;
	const { id } = req.user;

	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	if (user) {
		user.name = name || user.name;
		user.profilePicture = profilePicture || user.profilePicture;
		user.bio = bio || user.bio;

		const updatedUser = await prisma.user.update({
			where: {
				id: id,
			},
			data: user,
		});

		res.json({ updatedUser });
	} else {
		res.status(404);
		res.json({ message: 'User not found.' });
	}
};

// @desc    Delete my informations
// @route   DELETE /api/me
// @access  Private
export const deleteMe = async (req, res, next) => {
	try {
		await prisma.user.delete({
			where: {
				id: req.user.id,
			},
		});

		res.json({ message: 'Account successfully deleted !' });
	} catch (e) {
		e.type = 'input';
		next(e);
	}
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private
export const users = async (req, res) => {
	const users = await prisma.user.findMany({
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ users });
};

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	if (user) {
		res.json({ user });
	} else {
		res.status(404);
		res.json({ message: 'User not found.' });
	}
};

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUserById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await prisma.user.delete({
			where: {
				id: id,
			},
		});

		res.json({ deleted: { user } });
	} catch (e) {
		res.status(404);
		res.json({ message: 'User not found.' });
	}
};

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private
export const getUserByUsername = async (req, res) => {
	const { username } = req.params;

	const user = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (user) {
		res.json({ user });
	} else {
		res.status(404);
		res.json({ message: 'User not found.' });
	}
};
