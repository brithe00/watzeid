import axios from 'axios';

export const getPosts = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get('/api/posts', config).then((res) => res.data);
};

export const getPostById = (id) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/posts/${id}`, config).then((res) => res.data);
};

export const getMyPosts = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get('/api/me/posts', config).then((res) => res.data);
};

export const getPostsForUsername = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/${username}/posts`, config).then((res) => res.data);
};

export const deletePostById = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.delete(`/api/posts/${postId}/list`, config)
		.then((res) => res.data);
};

export const createPost = (caption, media) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.post(`/api/posts`, { caption, media }, config)
		.then((res) => res.data);
};
