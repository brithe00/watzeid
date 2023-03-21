import {
	Box,
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	HStack,
	Icon,
	IconButton,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getMyPosts } from '../api/post';
import AlertState from '../components/Alert';
import { Gallery } from '../components/Gallery';
import Layout from '../components/Layout';
import { PageHeaderNoUser } from '../components/PageHeaderNoUser';
import Spinner from '../components/Spinner';
import { BsChat, BsHeart } from 'react-icons/bs';
import { FiEye, FiTrash2 } from 'react-icons/fi';

import { format } from 'date-fns';

const Posts = () => {
	const color = useColorModeValue('sm', 'sm-dark');

	const getMyPostsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: () => getMyPosts(),
	});

	if (getMyPostsQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getMyPostsQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getMyPostsQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	return (
		<Layout>
			<PageHeaderNoUser heading="Your Posts" text="Manage your posts" />

			{getMyPostsQuery.data.posts.length === 0 ? (
				<Box as="section" mt="6">
					<Container>
						<AlertState
							status="error"
							message={`You did not created posts !`}
						/>
					</Container>
				</Box>
			) : (
				<Box
					as="section"
					py={{
						base: '4',
						md: '8',
					}}
				>
					<Container
						mx="auto"
						py={{
							base: '4',
							md: '8',
						}}
					>
						<SimpleGrid
							columns={{
								base: 1,
								md: 2,
							}}
							spacing="4"
						>
							{getMyPostsQuery.data.posts.map((post) => (
								<Card key={post.id}>
									<CardHeader>
										<Text>
											Posted{' '}
											{format(
												new Date(post.createdAt),
												"dd/MM/yyyy' at 'HH:mm"
											)}
										</Text>
									</CardHeader>

									<Gallery images={post.media} key={post.id} alt={post.id} />

									<CardFooter display="flex" justifyContent="space-between">
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<Box p="2">
												<Icon as={BsHeart} fontSize="1.25rem" />
												<Text as="b" ml="2">
													{post._count.likes}
												</Text>
											</Box>

											<Box p="2" ml="2">
												<Icon as={BsChat} fontSize="1.25rem" />
												<Text as="b" ml="2">
													{post._count.comments}
												</Text>
											</Box>
										</Box>

										<Box>
											<IconButton
												as="a"
												href={`/post/${post.id}`}
												icon={<FiEye fontSize="1.25rem" />}
												aria-label="View Post"
												variant="ghost"
											/>
											<IconButton
												ml="2"
												as="a"
												icon={<FiTrash2 fontSize="1.25rem" />}
												aria-label="Delete Post"
												cursor="pointer"
												variant="ghost"
											/>
										</Box>
									</CardFooter>

									{/* <Box display="flex" justifyContent="space-between">
										<HStack p="2">
											<Box display="flex" alignItems="center">
												<Icon as={BsHeart} fontSize="1.25rem" />
												<Text as="b" ml="2">
													{post._count.likes}
												</Text>
											</Box>

											<Box display="flex" alignItems="center">
												<Icon as={BsChat} fontSize="1.25rem" />
												<Text as="b" ml="2">
													{post._count.comments}
												</Text>
											</Box>
										</HStack>

										<Stack>
											<Box>
												<IconButton
													as="a"
													href={`/post/${post.id}`}
													icon={<FiEye fontSize="1.25rem" />}
													variant="ghost"
													aria-label="View Post"
												/>
												<IconButton
													as="a"
													icon={<FiTrash2 fontSize="1.25rem" />}
													variant="ghost"
													aria-label="Delete Post"
													cursor="pointer"
												/>
											</Box>
										</Stack>
									</Box> */}

									{/* <HStack justifyContent="space-between">
										<HStack p="2">
											<Button
												variant="ghost"
												leftIcon={<BsHeart fontSize="1.25rem" />}
											>
												{post._count.likes}
											</Button>

											<Button
												variant="ghost"
												leftIcon={<BsChat fontSize="1.25rem" />}
											>
												{post._count.comments}
											</Button>
										</HStack>

										<HStack p="2">
											<IconButton
												as="a"
												href={`/post/${post.id}`}
												icon={<FiEye fontSize="1.25rem" />}
												variant="ghost"
												aria-label="View Post"
											/>
											<IconButton
												as="a"
												icon={<FiTrash2 fontSize="1.25rem" />}
												variant="ghost"
												aria-label="Delete Post"
												cursor="pointer"
											/>
										</HStack>
									</HStack> */}
								</Card>
							))}
						</SimpleGrid>
					</Container>
				</Box>
			)}
		</Layout>
	);
};

export default Posts;
