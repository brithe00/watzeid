import axios from 'axios';

export const followUser = (username) => {
	const token = localStorage.getItem('token');

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return axios.put(`/api/users/${username}/follow`);
};

export const unfollowUser = (username) => {
	const token = localStorage.getItem('token');

	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return axios.put(`/api/users/${username}/unfollow`);
};
