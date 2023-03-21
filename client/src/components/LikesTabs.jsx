import {
	AspectRatio,
	Box,
	Container,
	Flex,
	HStack,
	Image,
	SimpleGrid,
	Spinner,
	VStack,
} from '@chakra-ui/react';
import { BsHeartFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getLikesForUsername } from '../api/like';
import AlertState from './Alert';

const LikesTabs = () => {
	const { username } = useParams();

	const getLikesForUserQuery = useQuery({
		queryKey: ['likes', username],
		queryFn: () => getLikesForUsername(username),
	});

	if (getLikesForUserQuery.status === 'loading') return <Spinner />;

	if (getLikesForUserQuery.status === 'error')
		return (
			<Container>
				<AlertState
					status="error"
					message={getLikesForUserQuery.error.response.data.message}
				/>
			</Container>
		);

	return (
		<>
			{getLikesForUserQuery.data.likes.length === 0 ? (
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
					{getLikesForUserQuery.data.likes.map((like) => (
						<Box key={like.id}>
							<Link to={`/post/${like.post.id}`}>
								<AspectRatio ratio={1}>
									<Image src={like.post.media[0].url} />
								</AspectRatio>
							</Link>
							<HStack pt="1" pl="1">
								<Box>
									<BsHeartFill color="#ED64A6" />
								</Box>
								<Box>{like.post.points}</Box>
							</HStack>
						</Box>
					))}
				</SimpleGrid>
			)}
		</>
	);
};

export default LikesTabs;
