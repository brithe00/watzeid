export const getPosts = () => {
	const token = localStorage.getItem('token');

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	return axios
		.get('http://localhost:8000/api/posts', config)
		.then((res) => res.data);
};

export const getPostById = (id) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};

	return axios
		.get(`http://localhost:8000/api/posts/${id}`)
		.then((res) => res.data);
};
