import {
	Box,
	ButtonGroup,
	Container,
	Icon,
	IconButton,
	Link,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { Link as ReachLink } from 'react-router-dom';
import AlertState from '../components/Alert';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getMyComments, deleteComment } from '../api/comments';

import { LinkIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';

const Comments = () => {
	const color = useColorModeValue('sm', 'sm-dark');

	const queryClient = useQueryClient();

	const getMyCommentsQuery = useQuery({
		queryKey: ['comments'],
		queryFn: () => getMyComments(),
	});

	const deleteCommentMutation = useMutation({
		mutationFn: deleteComment,
		onSuccess: () => queryClient.invalidateQueries(['comments']),
	});

	const deleteCommentHandler = (postId) => {
		deleteCommentMutation.mutate(postId);
	};

	if (getMyCommentsQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getMyCommentsQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getMyCommentsQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	const formatDate = (timestamp) => {
		var dateFormat = new Date(timestamp);

		return (
			dateFormat.getDate() +
			'/' +
			(dateFormat.getMonth() + 1) +
			'/' +
			dateFormat.getFullYear() +
			' ' +
			dateFormat.getHours() +
			':' +
			dateFormat.getMinutes()
		);
	};

	const Card = (props) => {
		return (
			<Box
				maxW="3xl"
				mx="auto"
				bg={useColorModeValue('white', 'gray.700')}
				rounded="xl"
				padding="10"
				shadow={{ md: 'base' }}
				px={{ base: '6', md: '8' }}
				{...props}
			/>
		);
	};

	return (
		<Layout>
			{deleteCommentMutation.status === 'loading' && <Spinner />}
			{getMyCommentsQuery.data.comments.length === 0 ? (
				<Container>
					<Card>
						<AlertState
							status="error"
							message={`You did not commented posts !`}
						/>
					</Card>
				</Container>
			) : (
				<Container
					mx="auto"
					py={{
						base: '4',
						md: '8',
					}}
				>
					<Box bg="bg-surface" py="4" boxShadow={color} borderRadius="lg">
						<Stack divider={<StackDivider />} spacing="4">
							{getMyCommentsQuery.data.comments.map((comment) => (
								<Stack key={comment.id} fontSize="sm" px="4" spacing="0.5">
									<Box>
										<Text fontWeight="medium" color="emphasized">
											You commented on post :{' '}
											<Link as={ReachLink} to={`/post/${comment.post.id}`}>
												{comment.post.caption} <Icon as={LinkIcon} />
											</Link>
										</Text>
										<Text color="subtle">
											Published {formatDate(comment.createdAt)}
										</Text>
									</Box>
									<Text
										noOfLines={4}
										color="muted"
										// sx={{
										// 	'-webkit-box-orient': 'vertical',
										// 	'-webkit-line-clamp': '2',
										// 	overflow: 'hidden',
										// 	display: '-webkit-box',
										// }}
									>
										{comment.text}
									</Text>
									<ButtonGroup pt="2">
										<IconButton
											as="a"
											href={`/post/${comment.post.id}`}
											aria-label="View Post"
											icon={<ViewIcon />}
										/>
										<IconButton
											as="a"
											href="#"
											aria-label="Delete Comment"
											icon={<DeleteIcon />}
											onClick={() => deleteCommentHandler(comment.post.id)}
										/>
									</ButtonGroup>
								</Stack>
							))}
						</Stack>
					</Box>
				</Container>
			)}
		</Layout>
	);
};

export default Comments;
