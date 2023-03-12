import {
	Box,
	Button,
	Container,
	SimpleGrid,
	useColorModeValue,
} from '@chakra-ui/react';
import AlertState from '../components/Alert';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import {
	CardWithAvatar,
	FollowerCount,
	UserInfo,
} from '../components/UserCardList';

import { useQuery } from 'react-query';
import { getFollowingForUser } from '../api/follow';
import { useNavigate, useParams } from 'react-router-dom';

const Following = () => {
	const color = useColorModeValue('sm', 'sm-dark');

	const navigate = useNavigate();

	const { username } = useParams();

	const getFollowingForUserQuery = useQuery({
		queryKey: ['following', username],
		queryFn: () => getFollowingForUser(username),
	});

	if (getFollowingForUserQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getFollowingForUserQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getFollowingForUserQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	return (
		<Layout>
			{getFollowingForUserQuery.data.following.length === 0 ? (
				<Container>
					<AlertState
						status="error"
						message={`@${username} following nobody !`}
					/>
				</Container>
			) : (
				<Box
					bg={color}
					px={{
						base: '6',
						md: '8',
					}}
					py="12"
				>
					<Box
						as="section"
						maxW={{
							base: 'xs',
							md: '3xl',
						}}
						mx="auto"
					>
						<SimpleGrid
							columns={{
								base: 1,
								md: 3,
							}}
							spacing="6"
						>
							{getFollowingForUserQuery.data.following.map((user) => {
								const {
									name,
									username,
									bio,
									profilePicture,
									isAdmin,
									followers,
								} = user;
								return (
									<CardWithAvatar
										key={name}
										avatarProps={{
											src: profilePicture,
										}}
									>
										<UserInfo
											mt="3"
											name={name}
											username={username}
											bio={bio}
											isAdmin={isAdmin}
										/>
										<FollowerCount my="4" count={followers.length} />
										<Button
											variant="outline"
											colorScheme="blue"
											rounded="full"
											size="sm"
											width="full"
											onClick={() => navigate(`/${user.username}`)}
										>
											View Profile
										</Button>
									</CardWithAvatar>
								);
							})}
						</SimpleGrid>
					</Box>
				</Box>
			)}
		</Layout>
	);
};

export default Following;
