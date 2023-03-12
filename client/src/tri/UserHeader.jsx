import {
	Avatar,
	Icon,
	HStack,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { HiShieldCheck } from 'react-icons/hi';

const UserHeader = ({ timestamp }) => {
	return (
		<Stack
			direction={{
				base: 'row',
				md: 'row',
			}}
			alignItems="center"
			mb="2"
		>
			<Avatar
				mr="2"
				src="https://plus.unsplash.com/premium_photo-1669703777692-0289d224bcc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
			/>
			<Text as="h2" fontWeight="bold" fontSize="xl">
				@meldesigner
			</Text>
			<Icon as={HiShieldCheck} color="green.500" />
			<HStack
				fontSize={{
					base: 'md',
					md: 'lg',
				}}
			>
				<Text
					as="span"
					color={useColorModeValue('gray.500', 'gray.300')}
					lineHeight="1"
				>
					- {timestamp}
				</Text>
			</HStack>
		</Stack>
	);
};

export default UserHeader;
