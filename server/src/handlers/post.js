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
	});
	res.json({ posts });
};

export const getPostById = async (req, res) => {
	const post = await prisma.post.findUnique({
		where: {
			id: req.params.id,
		},
		include: { media: true, items: true, comments: true, likes: true },
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
				caption: 'testttttttt',
				userId: req.user.id,
				media: {
					createMany: {
						data: req.body.links,
					},
				},
				items: {
					createMany: {
						data: req.body.items,
					},
				},
			},
			include: { media: true, items: true },
		});

		res.json({ data: post });
	} catch (e) {
		next(e);
	}
};
