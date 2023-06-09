import {
	Box,
	Button,
	Container,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/user';
import AlertState from '../components/Alert';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import {
	CardWithAvatar,
	FollowerCount,
	UserInfo,
} from '../components/UserCardList';
import { useNavigate } from 'react-router-dom';
import { PageHeaderNoUser } from '../components/PageHeaderNoUser';

const Users = () => {
	const color = useColorModeValue('sm', 'sm-dark');

	const size = useBreakpointValue({
		base: 'xs',
		md: 'sm',
	});

	const navigate = useNavigate();

	const getUsersQuery = useQuery({
		queryKey: ['users'],
		queryFn: () => getUsers(),
	});

	if (getUsersQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getUsersQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getUsersQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	return (
		<Layout>
			<PageHeaderNoUser
				heading="Member overview"
				text="All registered users in the overview"
			/>
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
						{getUsersQuery.data.users.map((user) => {
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
		</Layout>
	);
};

export default Users;
