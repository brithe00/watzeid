import axios from 'axios';

export const getPosts = () => {
	return axios.get('http://localhost:8000/api/posts').then((res) => res.data);
};

export const getPostById = (id) => {
	return axios
		.get(`http://localhost:8000/api/posts/${id}`)
		.then((res) => res.data);
};

export const getMyPosts = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get('http://localhost:8000/api/me/posts', config)
		.then((res) => res.data);
};

export const getPostsForUsername = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`http://localhost:8000/api/${username}/posts`, config)
		.then((res) => res.data);
};
