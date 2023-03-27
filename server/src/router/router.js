import { Router } from 'express';
import { admin } from '../middleware/auth.js';

import {
	deleteUserById,
	getUserById,
	getUserByUsername,
	me,
	updateMe,
	users,
	deleteMe,
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
	deletePostById,
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

router.get('/me', me);
router.put('/me', updateMe);
router.delete('/me', deleteMe);
router.get('/users', users);
router.get('/users/:id', getUserById);
router.delete('/users/:id', admin, deleteUserById);
router.get('/users/:username/profile', getUserByUsername);

router.get('/me/following', myFollowing);
router.get('/me/followers', myFollowers);

router.get('/:username/following', getFollowingForUser);
router.get('/:username/followers', getFollowersForUser);

// router.put('/users/:id/follow', followUser);
// router.put('/users/:id/unfollow', unfollowUser);
router.get('/me/likes', getMyLikes);
router.get('/me/posts', getMyPosts);
router.get('/:username/likes', getAllLikesForUserByUsername);

router.get('/:username/posts', getPostsForUsername);

router.put('/users/:username/follow', followUserByUsername);
router.put('/users/:username/unfollow', unfollowUserByUsername);

router.delete('/posts/:id/list', deletePostById);

router.post('/posts/:id/like', likePost);
router.delete('/posts/:id/unlike', unlikePost);

router.post('/posts/:id', createComment);
router.delete('/posts/:id/comment', deleteComment);
router.get('/posts/:id/comments', getAllCommentsForPost);
router.get('/me/comments', getAllCommentsForMe);

router.get('/:username/comments', getAllCommentsForUser);

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);

router.post('/uploads', upload.single('image'), uploadAvatar);

export default router;
