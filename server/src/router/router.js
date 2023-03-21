import { Router } from 'express';
import { admin, protect } from '../middleware/auth.js';

import {
	deleteUserById,
	getUserById,
	getUserByUsername,
	me,
	updateMe,
	users,
	deleteMe,
	login,
	register,
} from '../handlers/user.js';

import {
	getFollowersForUser,
	getFollowingForUser,
	myFollowers,
	myFollowing,
} from '../handlers/follow.js';

import {
	followUser,
	followUserByUsername,
	unfollowUser,
	unfollowUserByUsername,
} from '../handlers/followSystem.js';

import {
	createComment,
	deleteComment,
	getAllCommentsForPost,
	getAllCommentsForMe,
	getAllCommentsForUser,
} from '../handlers/comment.js';
import {
	createPost,
	getAllPosts,
	getMyPosts,
	getPostById,
	getPostsForUsername,
} from '../handlers/post.js';

import { upload, uploadAvatar } from '../handlers/upload.js';
import {
	getAllLikesForUserByUsername,
	getMyLikes,
	likePost,
	unlikePost,
} from '../handlers/like.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, me);
router.put('/me', protect, updateMe);
router.delete('/me', protect, deleteMe);
router.get('/users', protect, users);
router.get('/users/:id', protect, getUserById);
router.delete('/users/:id', protect, admin, deleteUserById);
router.get('/users/:username/profile', protect, getUserByUsername);

router.get('/me/following', protect, myFollowing);
router.get('/me/followers', protect, myFollowers);

router.get('/:username/following', protect, getFollowingForUser);
router.get('/:username/followers', protect, getFollowersForUser);

// router.put('/users/:id/follow', followUser);
// router.put('/users/:id/unfollow', unfollowUser);
router.get('/me/likes', protect, getMyLikes);
router.get('/me/posts', protect, getMyPosts);
router.get('/:username/likes', protect, getAllLikesForUserByUsername);

router.get('/:username/posts', protect, getPostsForUsername);

router.put('/users/:username/follow', protect, followUserByUsername);
router.put('/users/:username/unfollow', protect, unfollowUserByUsername);

router.post('/posts/:id/like', protect, likePost);
router.delete('/posts/:id/unlike', protect, unlikePost);

router.post('/posts/:id', protect, createComment);
router.delete('/posts/:id/comment', protect, deleteComment);
router.get('/posts/:id/comments', protect, getAllCommentsForPost);
router.get('/me/comments', protect, getAllCommentsForMe);

router.get('/:username/comments', protect, getAllCommentsForUser);

router.post('/posts', protect, createPost);
router.get('/posts', protect, getAllPosts);
router.get('/posts/:id', protect, getPostById);

router.post('/uploads', upload.single('image'), protect, uploadAvatar);

export default router;
