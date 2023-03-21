import {
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Container,
	Flex,
	Icon,
	Heading,
	IconButton,
	Image,
	Text,
	HStack,
} from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiShieldCheck } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/post';
import AlertState from '../components/Alert';
import { Gallery } from '../components/Gallery';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const Post = () => {
	const { postId } = useParams();

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['post', postId],
		queryFn: () => getPostById(postId),
	});

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
			<Center>
				<Card maxW="md">
					<CardHeader>
						<Flex spacing="4">
							<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
								<Avatar src={data.post.user.profilePicture} />

								<Box>
									<HStack>
										<Text as="b">{data.post.user.name}</Text>
										{data.post.user.isAdmin && (
											<Icon as={HiShieldCheck} color="green.500" />
										)}
									</HStack>

									<Text color="subtle">@{data.post.user.username}</Text>
								</Box>
							</Flex>
							<Text color="subtle">
								•{' '}
								{formatDistance(new Date(data.post.createdAt), new Date(), {
									addSuffix: true,
								})}
							</Text>
						</Flex>
					</CardHeader>
					<CardBody>
						<Text>{data.post.caption}</Text>
					</CardBody>
					<Gallery images={data.post.media} />

					<CardFooter
						justify="space-between"
						flexWrap="wrap"
						sx={{
							'& > button': {
								minW: '136px',
							},
						}}
					>
						<Button flex="1" variant="ghost" leftIcon={<BiLike />}>
							Like
						</Button>
						<Button flex="1" variant="ghost" leftIcon={<BiChat />}>
							Comment
						</Button>
						<Button flex="1" variant="ghost" leftIcon={<BiShare />}>
							Share
						</Button>
					</CardFooter>
				</Card>
			</Center>
		</Layout>
	);
};

export default Post;
