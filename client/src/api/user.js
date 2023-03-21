import axios from 'axios';

export const register = ({ username, email, password }) => {
	return axios
		.post('/api/register', {
			username,
			email,
			password,
		})
		.then((res) => localStorage.setItem('token', res.data.token));
};

export const login = ({ username, password }) => {
	return axios
		.post('/api/login', { username, password })
		.then((res) => localStorage.setItem('token', res.data.token));
};

export const me = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get('/api/me', config).then((res) => res.data);
};

export const getUserByUsername = (username) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.get(`/api/users/${username}/profile`, config)
		.then((res) => res.data);
};

export const getUsers = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.get('/api/users', config).then((res) => res.data);
};

export const deleteMe = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return axios.delete('/api/me', config).then((res) => res.data);
};

export const updateMe = ({ name, bio, profilePicture }) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return axios
		.put('/api/me', { name, bio, profilePicture }, config)
		.then((res) => res.data);
};
