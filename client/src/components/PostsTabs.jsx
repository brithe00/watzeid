import {
	AspectRatio,
	Box,
	Container,
	Image,
	SimpleGrid,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getPostsForUsername } from '../api/post';
import AlertState from './Alert';
import Spinner from './Spinner';

const PostsTabs = () => {
	const { username } = useParams();

	const getPostsForUserQuery = useQuery({
		queryKey: ['posts', username],
		queryFn: () => getPostsForUsername(username),
	});

	if (getPostsForUserQuery.status === 'loading') return <Spinner />;

	if (getPostsForUserQuery.status === 'error')
		return (
			<Container>
				<AlertState
					status="error"
					message={getPostsForUserQuery.error.response.data.message}
				/>
			</Container>
		);

	return (
		<>
			{getPostsForUserQuery.data.posts.length === 0 ? (
				<AlertState
					status="error"
					message={`@${username} did not liked posts !`}
				/>
			) : (
				<SimpleGrid
					columns={{
						base: 2,
						md: 4,
					}}
					spacing="2"
				>
					{getPostsForUserQuery.data.posts.map((post) => (
						<Box key={post.id}>
							<Link to={`/post/${post.id}`}>
								<AspectRatio ratio={1}>
									<Image src={post.media[0].url} />
								</AspectRatio>
							</Link>
						</Box>
					))}
				</SimpleGrid>
			)}
		</>
	);
};

export default PostsTabs;
