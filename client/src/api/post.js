import axios from 'axios';

export const getPosts = () => {
	return axios.get('http://localhost:8000/api/posts').then((res) => res.data);
};

export const getPostById = (id) => {
	return axios
		.get(`http://localhost:8000/api/posts/${id}`)
		.then((res) => res.data);
};
