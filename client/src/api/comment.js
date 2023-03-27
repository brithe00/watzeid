import axios from 'axios';

export const getMyComments = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/me/comments`, config).then((res) => res.data);
};

export const getCommentsForUser = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/${username}/comments`, config).then((res) => res.data);
};

export const deleteComment = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.delete(`/api/posts/${postId}/comment`, config)
		.then((res) => res.data);
};

export const getCommentsForPost = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`/api/posts/${postId}/comments`, config)
		.then((res) => res.data);
};

export const createComment = (postId, text) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.post(`/api/posts/${postId}`, { text }, config)
		.then((res) => res.data);
};
