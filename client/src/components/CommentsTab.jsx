import {
	Box,
	Container,
	HStack,
	Icon,
	Link,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import AlertState from '../components/Alert';
import Spinner from '../components/Spinner';
import { Link as ReachLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommentsForUser } from '../api/comment';
import { FiLink } from 'react-icons/fi';

import { formatDistance } from 'date-fns';

const CommentsTab = () => {
	const { username } = useParams();

	const color = useColorModeValue('sm', 'sm-dark');

	const getCommentsForUserQuery = useQuery({
		queryKey: ['comments', username],
		queryFn: () => getCommentsForUser(username),
	});

	if (getCommentsForUserQuery.status === 'loading') return <Spinner />;

	if (getCommentsForUserQuery.status === 'error')
		return (
			<Container>
				<AlertState
					status="error"
					message={getCommentsForUserQuery.error.response.data.message}
				/>
			</Container>
		);

	return (
		<>
			{getCommentsForUserQuery.data.comments.length === 0 ? (
				<AlertState
					status="error"
					message={`@${username} did not commented posts !`}
				/>
			) : (
				<Box bg="bg-surface" py="4" borderRadius="lg" boxShadow={color}>
					<Stack divider={<StackDivider />} spacing="4">
						{getCommentsForUserQuery.data.comments.map((comment) => (
							<Stack key={comment.id} fontSize="sm" px="4" spacing="0.5">
								<HStack>
									<Text fontWeight="medium" color="emphasized" maxW="80%">
										{username} commented on post :{' '}
										<Link as={ReachLink} to={`/post/${comment.post.id}`}>
											{comment.post.caption} <Icon as={FiLink} />
										</Link>
									</Text>
									<Text color="subtle">
										•{' '}
										{formatDistance(new Date(comment.createdAt), new Date(), {
											addSuffix: true,
										})}
									</Text>
								</HStack>
								<Text
									noOfLines={3}
									color="muted"

									// sx={{
									// 	'-webkit-box-orient': 'vertical',
									// 	'-webkit-line-clamp': '4',
									// 	overflow: 'hidden',
									// 	display: '-webkit-box',
									// }}
								>
									{comment.text}
								</Text>
							</Stack>
						))}
					</Stack>
				</Box>
			)}
		</>
	);
};

export default CommentsTab;
