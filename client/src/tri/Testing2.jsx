import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/user';
import AlertState from './Alert';
import Spinner from './Spinner';

const Testing2 = () => {
	const { id } = useParams();

	const postById = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPostById(id),
	});

	if (postById.status === 'loading') return <Spinner />;

	if (postById.status === 'error')
		return (
			<AlertState
				status="error"
				message={postById.error.response.data.message}
			/>
		);

	return (
		<>
			<div>
				<h1>Post : </h1>
				<div>{postById.data.post.caption}</div>
			</div>
		</>
	);
};

export default Testing2;
