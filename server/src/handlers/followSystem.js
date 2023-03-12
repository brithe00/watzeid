import prisma from '../config/db.js';

// @desc    Follow a user
// @route   PUT /users/:id/follow
// @access  Private
export const followUser = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const { id } = req.params;

	const checkIfUserParamsExists = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	if (user && checkIfUserParamsExists && user.id !== id.toString()) {
		const alreadyFollowing = user.following.includes(id.toString());

		if (alreadyFollowing) {
			res.status(400);
			res.json({ message: 'Already following this user !' });
		} else {
			const follow = await prisma.user.update({
				where: { id: req.user.id },
				data: {
					following: {
						push: id.toString(),
					},
				},
			});

			const followed = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					followers: {
						push: req.user.id.toString(),
					},
				},
			});

			res.json({ follow, followed });
		}
	} else {
		res.status(404);
		res.json({ message: 'User not found!' });
	}
};

// @desc    Unfollow a user
// @route   PUT /users/:id/unfollow
// @access  Private
export const unfollowUser = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const { id } = req.params;

	const checkIfUserParamsExists = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	if (user && checkIfUserParamsExists && user.id !== id.toString()) {
		const alreadyUnfollowed = !user.following.includes(id.toString());

		if (alreadyUnfollowed) {
			res.status(400);
			res.json({ message: 'Already unfollowed this user!' });
		} else {
			const unfollow = await prisma.user.update({
				where: {
					id: req.user.id,
				},
				data: {
					following: {
						set: user.following.filter((r) => r.toString() !== id.toString()),
					},
				},
			});

			const unfollowed = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					followers: {
						set: checkIfUserParamsExists.followers.filter(
							(r) => r.toString() !== req.user.id.toString()
						),
					},
				},
			});

			res.json({ unfollow, unfollowed });
		}
	} else {
		res.status(404);
		res.json({ message: 'User not found!' });
	}
};

export const followUserByUsername = async (req, res) => {
	const me = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const { username } = req.params;

	const checkIfUserParamsExists = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (me && checkIfUserParamsExists && me.username !== username) {
		const alreadyFollowing = me.following.includes(checkIfUserParamsExists.id);

		if (alreadyFollowing) {
			res.status(400);
			res.json({ message: 'Already following this user !' });
		} else {
			const follow = await prisma.user.update({
				where: { id: req.user.id },
				data: {
					following: {
						push: checkIfUserParamsExists.id.toString(),
					},
				},
			});

			const followed = await prisma.user.update({
				where: {
					id: checkIfUserParamsExists.id,
				},
				data: {
					followers: {
						push: req.user.id.toString(),
					},
				},
			});

			res.json({ follow, followed });
		}
	} else {
		res.status(404);
		res.json({ message: 'User not found!' });
	}
};

export const unfollowUserByUsername = async (req, res) => {
	const me = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	const { username } = req.params;

	const checkIfUserParamsExists = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (me && checkIfUserParamsExists && me.username !== username) {
		const alreadyUnfollowed = !me.following.includes(
			checkIfUserParamsExists.id
		);

		if (alreadyUnfollowed) {
			res.status(400);
			res.json({ message: 'Already unfollowed this user!' });
		} else {
			const unfollow = await prisma.user.update({
				where: {
					id: req.user.id,
				},
				data: {
					following: {
						set: me.following.filter(
							(r) => r.toString() !== checkIfUserParamsExists.id.toString()
						),
					},
				},
			});

			const unfollowed = await prisma.user.update({
				where: {
					id: checkIfUserParamsExists.id,
				},
				data: {
					followers: {
						set: checkIfUserParamsExists.followers.filter(
							(r) => r.toString() !== req.user.id.toString()
						),
					},
				},
			});

			res.json({ unfollow, unfollowed });
		}
	} else {
		res.status(404);
		res.json({ message: 'User not found!' });
	}
};
