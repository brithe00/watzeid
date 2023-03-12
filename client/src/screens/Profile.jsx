import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
// eslint-disable-next-line no-unused-vars
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from 'react-query';
// eslint-disable-next-line no-unused-vars
import { getUserByUsername, deleteMe } from '../api/user';
import Spinner from '../components/Spinner';
import AlertState from '../components/Alert';
import { Container } from '@chakra-ui/react';

const Profile = () => {
	let { username } = useParams();

	const getUserQuery = useQuery({
		queryKey: ['user', username],
		queryFn: () => getUserByUsername(username),
	});

	if (getUserQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getUserQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getUserQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	return (
		<Layout>
			<UserCard user={getUserQuery.data.user} />
		</Layout>
	);
};

export default Profile;
