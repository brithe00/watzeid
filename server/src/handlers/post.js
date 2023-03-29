import prisma from '../config/db.js';

export const getAllPosts = async (req, res) => {
	const posts = await prisma.post.findMany({
		include: {
			media: true,
			items: true,
			comments: true,
			likes: true,
			user: true,
		},
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ posts });
};

export const getPostById = async (req, res) => {
	const post = await prisma.post.findUnique({
		where: {
			id: req.params.id,
		},
		include: {
			user: true,
			media: true,
			items: true,
			comments: true,
			likes: true,
		},
	});

	if (post) {
		res.json({ post });
	} else {
		res.status(404);
		res.json({ message: 'Post not found.' });
	}
};

export const createPost = async (req, res, next) => {
	// format: check User
	// {
	// 	"links": [
	// 			{"url": "test1"}, {"url": "test2"}, {"url": "test3"}
	// 		],
	// 		"items": [
	// 			{"name": "gigatest"}, {"name": "megatest"}, {"name": "++test"}
	// 		]
	// }

	try {
		const post = await prisma.post.create({
			data: {
				caption: req.body.caption,
				userId: req.user.id,
				media: {
					createMany: {
						data: req.body.media,
					},
				},
				// items: {
				// 	createMany: {
				// 		data: req.body.items,
				// 	},
				// },
			},
			include: { media: true },
		});

		res.json({ data: post });
	} catch (e) {
		next(e);
	}
};

export const getMyPosts = async (req, res) => {
	const posts = await prisma.post.findMany({
		where: {
			userId: req.user.id,
		},

		include: {
			media: true,
			items: true,
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ posts });
};

export const getPostsForUsername = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
	});

	if (user) {
		const posts = await prisma.post.findMany({
			where: {
				userId: user.id,
			},
			include: {
				media: true,
			},
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
		});

		res.json({ posts });
	} else {
		res.status(404);
		res.json({ message: 'User not found !' });
	}
};

export const deletePostById = async (req, res, next) => {
	try {
		const me = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
		});

		if (me) {
			const post = await prisma.post.delete({
				where: {
					id: req.params.id,
				},
			});

			res.json({ post });
		} else {
			res.status(404);
			res.json({ message: 'User not found !' });
		}
	} catch (e) {
		e.type = 'input';
		next(e);
	}
};
