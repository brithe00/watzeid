import {
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Container,
	Flex,
	Icon,
	IconButton,
	Text,
	HStack,
	Stack,
	Link,
	useColorModeValue,
	Textarea,
	StackDivider,
} from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { HiShieldCheck } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/post';
import { createComment, getCommentsForPost } from '../api/comment';
import AlertState from '../components/Alert';
import { Gallery } from '../components/Gallery';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link as ReachLink } from 'react-router-dom';
import { useState } from 'react';
import { likePost, unlikePost } from '../api/like';

const Post = () => {
	const { postId } = useParams();

	const queryClient = useQueryClient();

	const me = queryClient.getQueryData(['me']);

	const [comment, setComment] = useState('');

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['post', postId],
		queryFn: () => getPostById(postId),
	});

	const getCommentsForPostQuery = useQuery({
		queryKey: ['comments', postId],
		queryFn: () => getCommentsForPost(postId),
	});

	const mutation = useMutation({
		mutationFn: ({ postId, text }) => createComment(postId, text),
		onSuccess: () =>
			Promise.all([
				queryClient.invalidateQueries(['comments', postId]),
				queryClient.invalidateQueries(['post', postId]),
			]),
	});

	const likeMutation = useMutation({
		mutationFn: () => likePost(postId),
		onSuccess: () => queryClient.invalidateQueries(['post', postId]),
	});

	const unlikeMutation = useMutation({
		mutationFn: () => unlikePost(postId),
		onSuccess: () => queryClient.invalidateQueries(['post', postId]),
	});

	const color = useColorModeValue('gray.600', 'gray.300');

	if (isLoading) return <Layout children={<Spinner />} />;

	if (isError)
		return (
			<Layout
				children={
					<Container>
						<AlertState status="error" message={error.message} />
					</Container>
				}
			/>
		);

	return (
		<Layout>
			<Card maxW="xl">
				<CardHeader>
					<Flex spacing="4">
						<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
							<Avatar src={data?.post?.user?.profilePicture} />

							<Box>
								<HStack>
									<Link as={ReachLink} to={`/${data?.post?.user?.username}`}>
										<Text as="b">{data.post.user.name}</Text>
									</Link>

									{data?.post?.user?.isAdmin && (
										<Icon as={HiShieldCheck} color="green.500" />
									)}
								</HStack>

								<Text color="subtle">@{data?.post?.user?.username}</Text>
							</Box>
						</Flex>
						<Text color="subtle" display="flex" alignItems="center">
							•{' '}
							{formatDistance(new Date(data?.post?.createdAt), new Date(), {
								addSuffix: true,
							})}
						</Text>
					</Flex>
				</CardHeader>
				<CardBody>
					<Text>{data?.post?.caption}</Text>
				</CardBody>

				<Gallery images={data?.post?.media} />

				<CardFooter display="block">
					<Flex justifyContent="space-between" alignItems="center">
						<Box>
							{data?.post?.likes
								.map((like) => like.userId)
								.includes(me.user.id) ? (
								<IconButton
									icon={<BsHeartFill fontSize="1.25rem" />}
									aria-label="Unlike Post"
									variant="ghost"
									onClick={() => unlikeMutation.mutate({ postId })}
									isLoading={unlikeMutation.isLoading}
								/>
							) : (
								<IconButton
									icon={<BsHeart fontSize="1.25rem" />}
									aria-label="Like Post"
									variant="ghost"
									onClick={() => likeMutation.mutate({ postId })}
									isLoading={likeMutation.isLoading}
								/>
							)}
						</Box>

						<Box>
							<HStack>
								<Text fontSize="sm" fontWeight="medium" color={color}>
									{data?.post?.points === 1 ? (
										<>
											<b>{data.post.points}</b> like
										</>
									) : (
										<>
											<b>{data.post.points}</b> likes
										</>
									)}
								</Text>
								<Text fontSize="sm" fontWeight="medium" color={color}>
									{data?.post?.comments.length === 1 ? (
										<>
											<b>{data.post.comments.length}</b> comment
										</>
									) : (
										<>
											<b>{data.post.comments.length}</b> comments
										</>
									)}
								</Text>
							</HStack>
						</Box>
					</Flex>
					<Box>
						{getCommentsForPostQuery.status === 'loading' ? (
							<Spinner />
						) : getCommentsForPostQuery.data.comments.length === 0 ? (
							<Text py="2">No comments</Text>
						) : (
							<>
								<Stack
									py="6"
									spacing="2"
									divider={<StackDivider borderColor="sm-dark" />}
								>
									{getCommentsForPostQuery.data.comments.map((comment) => (
										<Box key={comment.id}>
											<HStack>
												<Link as={ReachLink} to={`/${comment.user.username}`}>
													<Text as="b">{comment.user.username}</Text>
												</Link>
												-
												<Text color="subtle">
													•{' '}
													{formatDistance(
														new Date(comment.createdAt),
														new Date(),
														{
															addSuffix: true,
														}
													)}
												</Text>
											</HStack>
											<Text noOfLines="3">{comment.text}</Text>
										</Box>
									))}
								</Stack>
							</>
						)}
						{getCommentsForPostQuery.status === 'error' && (
							<AlertState
								status="error"
								message={getCommentsForPostQuery.error.response.data.message}
							/>
						)}
					</Box>

					<Box>
						{mutation.status === 'sucess' && (
							<AlertState
								status="success"
								message="Post successfully commented !"
							/>
						)}

						{mutation.status === 'error' && (
							<Box py="2">
								<AlertState
									status="error"
									message="You already commented this post !"
								/>
							</Box>
						)}
						<Textarea
							placeholder="Add a comment..."
							resize="none"
							type="text"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Flex direction="row-reverse" py="2">
							<Button
								type="submit"
								variant="primary"
								onClick={() => {
									mutation.mutate({
										postId: postId,
										text: comment,
									});
									setComment('');
								}}
								isLoading={mutation.isLoading}
							>
								Publish
							</Button>
						</Flex>
					</Box>
				</CardFooter>
			</Card>
		</Layout>
	);
};

export default Post;
