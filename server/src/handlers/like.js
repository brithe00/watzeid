import prisma from '../config/db.js';

export const getMyLikes = async (req, res) => {
	const likes = await prisma.like.findMany({
		where: {
			userId: req.user.id,
		},
		include: {
			post: {
				include: {
					media: true,
				},
			},
		},
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ likes });
};

export const getAllLikesForUserByUsername = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
	});

	if (user) {
		const likes = await prisma.like.findMany({
			where: {
				userId: user.id,
			},
			include: {
				post: {
					include: {
						media: true,
					},
				},
			},
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
		});

		res.json({ likes });
	} else {
		res.status(404);
		res.json({ message: 'User not found !' });
	}
};

export const likePost = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const post = await prisma.post.findUnique({
		where: {
			id: req.params.id,
		},
		include: {
			likes: true,
		},
	});

	if (user && post) {
		const alreadyLiked = post.likes
			.map((like) => like.userId)
			.includes(user.id);

		if (alreadyLiked) {
			res.status(400);
			res.json({ message: 'Already liked this post !' });
		} else {
			const like = await prisma.like.create({
				data: {
					postId: post.id,
					userId: req.user.id,
					value: true,
				},
			});

			const addPoint = await prisma.post.update({
				where: {
					id: post.id,
				},
				data: {
					points: { increment: 1 },
				},
			});

			res.json({ like, addPoint });
		}
	} else {
		next(e);
	}
};

export const unlikePost = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const post = await prisma.post.findUnique({
		where: {
			id: req.params.id,
		},
		include: {
			likes: true,
		},
	});

	if (user && post) {
		const alreadyUnliked = !post.likes
			.map((like) => like.userId)
			.includes(user.id);

		if (alreadyUnliked) {
			res.status(400);
			res.json({ message: 'Already unliked this post !' });
		} else {
			const unlike = await prisma.like.deleteMany({
				where: {
					postId: post.id,
					userId: req.user.id,
				},
			});

			const removePoint = await prisma.post.update({
				where: {
					id: post.id,
				},
				data: {
					points: { increment: -1 },
				},
			});

			res.json({ unlike, removePoint });
		}
	} else {
		next(e);
	}
};
