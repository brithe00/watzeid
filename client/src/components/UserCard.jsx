import {
	Avatar,
	Box,
	Button,
	HStack,
	Icon,
	Link,
	Stack,
	Text,
	useColorModeValue,
	Wrap,
} from '@chakra-ui/react';
import { HiShieldCheck } from 'react-icons/hi';
import { useMeQuery } from '../hooks/queries';
import { Link as ReachLink } from 'react-router-dom';

import UserCardTabs from './UserCardTabs';

import { followUser, unfollowUser } from '../api/followSystem';
import { useMutation, useQueryClient } from 'react-query';

export const Card = (props) => {
	return (
		<Box
			maxW="3xl"
			mx="auto"
			bg={useColorModeValue('white', 'gray.700')}
			rounded={{ md: 'xl' }}
			padding="10"
			shadow={{ md: 'base' }}
			px={{ base: '6', md: '8' }}
			{...props}
		/>
	);
};

const UserCard = ({ user }) => {
	const { data } = useMeQuery();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: followUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['me']);
			queryClient.invalidateQueries(['user', user.username]);
		},
	});

	const unfollowMutation = useMutation({
		mutationFn: unfollowUser,
		onSuccess: () => {
			queryClient.invalidateQueries(['me']);
			queryClient.invalidateQueries(['user', user.username]);
		},
	});

	return (
		<Box>
			<Card>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing={{ base: '3', md: '10' }}
					align="flex-start"
				>
					<Stack spacing="4">
						<Avatar size="2xl" src={user.profilePicture} />

						{user.id === data?.user?.id ? (
							<ReachLink to={'/profile'}>
								<Button
									width="full"
									colorScheme="blue"
									display={{ base: 'none', md: 'initial' }}
								>
									Edit
								</Button>
							</ReachLink>
						) : data?.user?.following.includes(user.id) ? (
							<Button
								colorScheme="blue"
								onClick={() => unfollowMutation.mutate(user.username)}
								isLoading={unfollowMutation.isLoading}
							>
								Unfollow
							</Button>
						) : (
							<Button
								colorScheme="blue"
								onClick={() => mutation.mutate(user.username)}
								isLoading={mutation.isLoading}
							>
								Follow
							</Button>
						)}
					</Stack>
					<Box>
						<Stack
							spacing={{ base: '1', md: '2' }}
							direction={{ base: 'column', md: 'row' }}
						>
							<Text as="h2" fontWeight="bold" fontSize="xl">
								{user.name}
							</Text>
							<HStack fontSize={{ base: 'md', md: 'lg' }}>
								<Text
									as="span"
									color={useColorModeValue('gray.500', 'gray.300')}
									lineHeight="1"
								>
									@{user.username}
								</Text>
								{user.isAdmin && <Icon as={HiShieldCheck} color="green.500" />}
							</HStack>
						</Stack>
						{/* <Text mt="2">Graphic Designer and WordPress Expert</Text> */}
						<Wrap shouldWrapChildren my="4" spacing="4">
							<HStack>
								{/* <Icon as={HiCash} fontSize="xl" color="gray.400" /> */}
								<Link as={ReachLink} to={`/${user.username}/followers`}>
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={useColorModeValue('gray.600', 'gray.300')}
									>
										<b>{user.followers.length}</b> followers
									</Text>
								</Link>
							</HStack>

							<HStack spacing="1">
								{/* <Icon as={HiLocationMarker} color="gray.400" /> */}
								<Link as={ReachLink} to={`/${user.username}/following`}>
									<Text
										fontSize="sm"
										fontWeight="medium"
										color={useColorModeValue('gray.600', 'gray.300')}
									>
										<b>{user.following.length}</b> following
									</Text>
								</Link>
							</HStack>
						</Wrap>
						<Box fontSize="sm" noOfLines={4}>
							{user.bio}
						</Box>
						{/* <Wrap
							shouldWrapChildren
							mt="5"
							color={useColorModeValue('gray.600', 'gray.300')}
						>
							{['Adobe Photoshop', 'UX/UI', 'Landing Page', 'Web Design'].map(
								(tag) => (
									<Tag key={tag} color="inherit" px="3">
										{tag}
									</Tag>
								)
							)}
						</Wrap> */}
					</Box>
				</Stack>

				{user.id === data?.user?.id ? (
					<ReachLink to={'/profile'}>
						<Button
							mt="8"
							width="full"
							colorScheme="blue"
							display={{ md: 'none' }}
						>
							Edit
						</Button>
					</ReachLink>
				) : null}

				<UserCardTabs />
			</Card>
		</Box>
	);
};

export default UserCard;
