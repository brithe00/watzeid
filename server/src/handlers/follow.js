import prisma from '../config/db.js';

// @desc    Get my following
// @route   GET /me/following
// @access  Private
export const myFollowing = async (req, res) => {
	const followingIds = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		select: {
			following: true,
		},
	});

	if (followingIds) {
		const profiles = await prisma.user.findMany({
			where: {
				id: {
					in: followingIds.following.map((r) => r),
				},
			},
			select: {
				username: true,
				name: true,
				profilePicture: true,
				bio: true,
			},
		});

		res.json({ profiles });
	} else {
		res.status(404);
		res.json({ message: 'Users not found !' });
	}
};

// @desc    Get my followers
// @route   GET /me/followers
// @access  Private
export const myFollowers = async (req, res) => {
	const followersIds = await prisma.user.findUnique({
		where: { id: req.user.id },
		select: {
			followers: true,
		},
	});

	if (followersIds) {
		const profiles = await prisma.user.findMany({
			where: {
				id: {
					in: followersIds.followers.map((r) => r),
				},
			},
			select: {
				username: true,
				name: true,
				profilePicture: true,
				bio: true,
			},
		});

		res.json({ profiles });
	} else {
		res.status(404);
		res.json({ message: 'Users not found !' });
	}
};

// @desc    Get following for user
// @route   GET /:username/following
// @access  Private
export const getFollowingForUser = async (req, res) => {
	const identifyUser = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
		select: {
			following: true,
		},
	});

	if (identifyUser) {
		const following = await prisma.user.findMany({
			where: { id: { in: identifyUser.following.map((r) => r) } },
			select: {
				username: true,
				name: true,
				profilePicture: true,
				bio: true,
				followers: true,
				isAdmin: true,
			},
		});

		res.json({ following });
	} else {
		res.status(404);
		res.json({ message: 'User not found !' });
	}
};

// @desc    Get followers for user
// @route   GET /:username/followers
// @access  Private
export const getFollowersForUser = async (req, res) => {
	const identifyUser = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
		select: {
			followers: true,
		},
	});

	if (identifyUser) {
		const followers = await prisma.user.findMany({
			where: { id: { in: identifyUser.followers.map((r) => r) } },
			select: {
				username: true,
				name: true,
				profilePicture: true,
				bio: true,
				followers: true,
				isAdmin: true,
			},
		});

		res.json({ followers });
	} else {
		res.status(404);
		res.json({ message: 'User not found !' });
	}
};
