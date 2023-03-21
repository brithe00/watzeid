import {
	Box,
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
import { getMyComments, deleteComment } from '../api/comment';

import { FiLink, FiEye, FiTrash2 } from 'react-icons/fi';
import { PageHeaderNoUser } from '../components/PageHeaderNoUser';

import { format } from 'date-fns';

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

	return (
		<Layout>
			<PageHeaderNoUser
				heading="Your Comments"
				text="Show posts you commented and manage them"
			/>
			{deleteCommentMutation.status === 'loading' && <Spinner />}
			{getMyCommentsQuery.data.comments.length === 0 ? (
				<Box as="section" mt="6">
					<Container>
						<AlertState
							status="error"
							message={`You did not commented posts !`}
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
						<Box
							bg="bg-surface"
							boxShadow={color}
							borderRadius="lg"
							p={{
								base: '4',
								md: '6',
							}}
						>
							<Stack spacing="5" divider={<StackDivider />}>
								{getMyCommentsQuery.data.comments.map((comment) => (
									<Stack
										key={comment.id}
										justify="space-between"
										direction="row"
										spacing="4"
									>
										<Stack spacing="0.5" fontSize="sm" width="83%">
											<Text color="emphasized" fontWeight="medium">
												You commented on post :{' '}
												<Link as={ReachLink} to={`/post/${comment.post.id}`}>
													{comment.post.caption} <Icon as={FiLink} />
												</Link>
											</Text>
											<Text color="subtle">
												• commented{' '}
												{format(
													new Date(comment.createdAt),
													"dd/MM/yyyy' at 'HH:mm"
												)}
											</Text>
											<Text noOfLines={4} color="muted">
												{comment.text}
											</Text>
										</Stack>

										<Stack
											direction={{
												base: 'column',
												sm: 'row',
											}}
											spacing={{
												base: '0',
												sm: '1',
											}}
										>
											<IconButton
												as="a"
												href={`/post/${comment.post.id}`}
												icon={<FiEye fontSize="1.25rem" />}
												variant="ghost"
												aria-label="View Post"
											/>
											<IconButton
												as="a"
												icon={<FiTrash2 fontSize="1.25rem" />}
												variant="ghost"
												aria-label="Delete Comment"
												cursor="pointer"
												onClick={() => deleteCommentHandler(comment.post.id)}
											/>
										</Stack>
									</Stack>
								))}
							</Stack>
						</Box>
					</Container>
				</Box>
			)}
		</Layout>
	);
};

export default Comments;
