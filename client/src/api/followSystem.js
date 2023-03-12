import axios from 'axios';

export const followUser = (username) => {
	const token = localStorage.getItem('token');

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return axios.put(`http://localhost:8000/api/users/${username}/follow`);
};

export const unfollowUser = (username) => {
	const token = localStorage.getItem('token');

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return axios.put(`http://localhost:8000/api/users/${username}/unfollow`);
};
