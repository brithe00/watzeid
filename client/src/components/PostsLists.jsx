import {
	Avatar,
	Box,
	Button,
	Card,
	CardHeader,
	Container,
	Flex,
	Icon,
	HStack,
	Link,
	Text,
	CardBody,
	CardFooter,
	useColorModeValue,
	Stack,
	Center,
} from '@chakra-ui/react';
import { HiShieldCheck } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { getPosts } from '../api/post';
import AlertState from './Alert';
import Spinner from './Spinner';
import { Link as ReachLink } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Gallery } from './Gallery';
import { ViewIcon } from '@chakra-ui/icons';

const PostsLists = () => {
	const color = useColorModeValue('gray.600', 'gray.300');

	const getAllPostsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: () => getPosts(),
	});

	if (getAllPostsQuery.status === 'loading')
		return (
			<Container>
				<Spinner />
			</Container>
		);

	if (getAllPostsQuery.status === 'error')
		return (
			<Container>
				<AlertState
					status="error"
					message={getAllPostsQuery.error.response.data.message}
				/>
			</Container>
		);

	return (
		<>
			{getAllPostsQuery.data.posts.map((post) => (
				<Card maxW="xl" key={post.id} my="8">
					<CardHeader>
						<Flex spacing="4">
							<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
								<Avatar src={post.user.profilePicture} />

								<Box>
									<HStack>
										<Link as={ReachLink} to={`/${post.user.username}`}>
											<Text as="b">{post.user.name}</Text>
										</Link>

										{post.user.isAdmin && (
											<Icon as={HiShieldCheck} color="green.500" />
										)}
									</HStack>

									<Text color="subtle">@{post.user.username}</Text>
								</Box>
							</Flex>
							<Text color="subtle" display="flex" alignItems="center">
								•{' '}
								{formatDistance(new Date(post.createdAt), new Date(), {
									addSuffix: true,
								})}
							</Text>
						</Flex>
					</CardHeader>

					<CardBody>
						<Text>{post.caption}</Text>
					</CardBody>

					<Gallery images={post.media} />

					<CardFooter flexDirection="column">
						<Box>
							<HStack>
								<Text fontSize="sm" fontWeight="medium" color={color}>
									{post.points === 1 ? (
										<>
											<b>{post.points}</b> like
										</>
									) : (
										<>
											<b>{post.points}</b> likes
										</>
									)}
								</Text>
								<Text fontSize="sm" fontWeight="medium" color={color}>
									{post.comments.length === 1 ? (
										<>
											<b>{post.comments.length}</b> comment
										</>
									) : (
										<>
											<b>{post.comments.length}</b> comments
										</>
									)}
								</Text>
							</HStack>
						</Box>

						<Box pt="4">
							<ReachLink to={`/post/${post.id}`}>
								<Button width="full" colorScheme="blue" leftIcon={<ViewIcon />}>
									View Post
								</Button>
							</ReachLink>
						</Box>
					</CardFooter>
				</Card>
			))}
		</>
	);
};

export default PostsLists;
