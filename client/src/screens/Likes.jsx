import Layout from '../components/Layout';
import { PageHeaderNoUser } from '../components/PageHeaderNoUser';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getMyLikes, deleteLike } from '../api/like';
import Spinner from '../components/Spinner';
import {
	AspectRatio,
	Box,
	Button,
	Card,
	CardFooter,
	Container,
	Image,
	SimpleGrid,
	useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import AlertState from '../components/Alert';
import { FiEye } from 'react-icons/fi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Likes = () => {
	let navigate = useNavigate();

	const color = useColorModeValue('sm', 'sm-dark');

	const queryClient = useQueryClient();

	const getMyLikesQuery = useQuery({
		queryKey: ['likes'],
		queryFn: () => getMyLikes(),
	});

	const deleteLikeMutation = useMutation({
		mutationFn: deleteLike,
		onSuccess: () => queryClient.invalidateQueries(['likes']),
	});

	const deleteLikeHandler = (postId) => {
		deleteLikeMutation.mutate(postId);
	};

	if (getMyLikesQuery.status === 'loading')
		return <Layout children={<Spinner />} />;

	if (getMyLikesQuery.status === 'error')
		return (
			<Layout
				children={
					<Container>
						<AlertState
							status="error"
							message={getMyLikesQuery.error.response.data.message}
						/>
					</Container>
				}
			/>
		);

	return (
		<Layout>
			<PageHeaderNoUser
				heading="Your Likes"
				text="Show posts you liked and manage them"
			/>
			{deleteLikeMutation.status === 'loading' && <Spinner />}
			{getMyLikesQuery.data.likes.length === 0 ? (
				<Box as="section" mt="6">
					<Container>
						<AlertState status="error" message={`You did not liked posts !`} />
					</Container>
				</Box>
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
							{getMyLikesQuery.data.likes.map((like) => (
								<Card maxW="md" key={like.id}>
									<Link to={`/post/${like.post.id}`}>
										<AspectRatio ratio={1}>
											<Image
												objectFit="cover"
												src={like.post.media[0].url}
												alt="Chakra UI"
												roundedTop="md"
											/>
										</AspectRatio>
									</Link>

									<CardFooter justify="space-between" flexWrap="wrap">
										{like ? (
											<Button
												flex="1"
												variant="ghost"
												leftIcon={<BsHeartFill />}
												onClick={() => deleteLikeHandler(like.post.id)}
											>
												Liked
											</Button>
										) : (
											<Button flex="1" variant="ghost" leftIcon={<BsHeart />}>
												Like
											</Button>
										)}

										<Button
											flex="1"
											variant="ghost"
											leftIcon={<FiEye />}
											onClick={() => navigate(`/post/${like.post.id}`)}
										>
											View
										</Button>
									</CardFooter>
								</Card>
							))}
						</SimpleGrid>
					</Box>
				</Box>
			)}
		</Layout>
	);
};

export default Likes;
