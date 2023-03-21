import axios from 'axios';

export const getFollowingForUser = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`/api/${username}/following`, config)
		.then((res) => res.data);
};

export const getFollowersForUser = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`/api/${username}/followers`, config)
		.then((res) => res.data);
};
