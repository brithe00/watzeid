import {
	Avatar,
	Box,
	Flex,
	HStack,
	Icon,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { HiShieldCheck, HiUsers } from 'react-icons/hi';

export const CardWithAvatar = (props) => {
	const { children, avatarProps, ...rest } = props;
	return (
		<Flex
			direction="column"
			alignItems="center"
			rounded="md"
			padding="8"
			position="relative"
			bg={useColorModeValue('white', 'gray.700')}
			shadow={{
				md: 'base',
			}}
			{...rest}
		>
			<Box
				position="absolute"
				inset="0"
				height="20"
				bg="blue.600"
				roundedTop="inherit"
			/>
			<Avatar size="xl" {...avatarProps} />
			{children}
		</Flex>
	);
};

export const UserInfo = (props) => {
	const { name, username, bio, isAdmin, ...stackProps } = props;
	return (
		<VStack spacing="1" flex="1" {...stackProps}>
			<HStack>
				<Text fontWeight="bold">{name}</Text>
				{isAdmin && (
					<Icon
						as={HiShieldCheck}
						color="green.500"
						verticalAlign="text-bottom"
					/>
				)}
			</HStack>
			<HStack>
				<Text color={useColorModeValue('gray.500', 'gray.300')}>
					@{username}
				</Text>
			</HStack>
			<Text
				fontSize="sm"
				textAlign="center"
				noOfLines={2}
				color={useColorModeValue('gray.600', 'gray.400')}
			>
				{bio}
			</Text>
		</VStack>
	);
};

export const FollowerCount = (props) => {
	const { count, ...stackProps } = props;
	return (
		<HStack
			spacing="1"
			fontSize="sm"
			color={useColorModeValue('gray.600', 'gray.400')}
			{...stackProps}
		>
			<Icon as={HiUsers} />
			<Text>{count} followers</Text>
		</HStack>
	);
};
