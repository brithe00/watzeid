import axios from 'axios';

export const getMyLikes = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/me/likes`, config).then((res) => res.data);
};

export const getLikesForUsername = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get(`/api/${username}/likes`, config).then((res) => res.data);
};

export const deleteLike = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.delete(`/api/posts/${postId}/unlike`, config)
		.then((res) => res.data);
};

export const likePost = (postId) => {
	const token = localStorage.getItem('token');

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return axios.post(`/api/posts/${postId}/like`).then((res) => res.data);
};

export const unlikePost = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.delete(`/api/posts/${postId}/unlike`, config)
		.then((res) => res.data);
};
