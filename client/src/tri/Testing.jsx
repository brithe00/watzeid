import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPosts } from '../api/user';
import { Link } from 'react-router-dom';
import AlertState from './Alert';
import Spinner from './Spinner';

const Testing = () => {
	const postsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	if (postsQuery.status === 'loading') return <Spinner />;

	if (postsQuery.status === 'error')
		return (
			<AlertState
				status="error"
				message={postsQuery.error.response.data.message}
			/>
		);

	if (postsQuery.status === 'error') return <div>{postsQuery.error}</div>;

	return (
		<>
			<div>
				<h1>Post List</h1>
				<ol>
					{postsQuery.data.posts.map((post) => (
						<li key={post.id}>
							<Link to={`/post/${post.id}`}>{post.caption}</Link>
						</li>
					))}
				</ol>
			</div>
		</>
	);
};

export default Testing;
