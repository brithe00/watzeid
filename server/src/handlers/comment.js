import prisma from '../config/db.js';

// @desc    Create a comment for a post
// @route   POST /posts/:id
// @access  Private
export const createComment = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: req.params.id,
			},
			include: {
				comments: true,
			},
		});

		if (post) {
			const alreadyCommented = post.comments.find(
				(r) => r.userId.toString() === req.user.id.toString()
			);

			if (alreadyCommented) {
				res.status(400);
				res.json({ message: 'Post already commented !' });
			} else {
				const comment = await prisma.comment.create({
					data: {
						text: req.body.text,
						userId: req.user.id,
						postId: req.params.id,
					},
				});

				res.json({ comment });
			}
		} else {
			res.status(404);
			res.json({ message: 'Post not found !' });
		}
	} catch (e) {
		e.type = 'input';
		next(e);
	}
};

// @desc    Delete a comment
// @route   DELETE /posts/:id/comment
// @access  Private
export const deleteComment = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: req.params.id,
			},
			include: {
				comments: true,
			},
		});

		if (post) {
			const myComment = post.comments.find(
				(r) => r.userId.toString() === req.user.id.toString()
			);

			if (myComment) {
				await prisma.comment.delete({
					where: {
						id: myComment.id,
					},
				});

				res.json({ message: 'Comment deleted !' });
			} else {
				res.status(404);
				res.json({ message: 'Comment not found !' });
			}
		} else {
			res.status(404);
			res.json({ message: 'Post not found !' });
		}
	} catch (e) {
		e.type = 'input';
		next(e);
	}
};

// @desc    Get all the comments for the post
// @route   GET /posts/:id/comments
// @access  Private
export const getAllCommentsForPost = async (req, res) => {
	const comments = await prisma.comment.findMany({
		where: {
			postId: req.params.id,
		},
		include: {
			user: {
				select: {
					name: true,
					profilePicture: true,
					username: true,
					bio: true,
				},
			},
		},
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ comments });
};

// @desc    Get all the comments for me
// @route   GET /me/comments
// @access  Private
export const getAllCommentsForMe = async (req, res) => {
	const comments = await prisma.comment.findMany({
		where: {
			userId: req.user.id,
		},
		include: { post: true },
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	});

	res.json({ comments });
};

// @desc    Get all the comments the user
// @route   GET /:username/comments
// @access  Private
export const getAllCommentsForUser = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
	});

	if (user) {
		const comments = await prisma.comment.findMany({
			where: {
				userId: user.id,
			},
			include: { post: true },
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
		});

		res.json({ comments });
	} else {
		res.status(404);
		res.json({ message: 'User not found !' });
	}
};
