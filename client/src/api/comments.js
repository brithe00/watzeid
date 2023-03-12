import axios from 'axios';

export const getMyComments = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`http://localhost:8000/api/me/comments`, config)
		.then((res) => res.data);
};

export const getCommentsForUser = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`http://localhost:8000/api/${username}/comments`, config)
		.then((res) => res.data);
};

export const deleteComment = (postId) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.delete(`http://localhost:8000/api/posts/${postId}/comment`, config)
		.then((res) => res.data);
};
