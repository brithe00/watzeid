import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react';

import Dropzone from './Dropzone';

const ProfileFields = (props) => {
	return (
		<Box
			bg="bg-surface"
			boxShadow={useColorModeValue('sm', 'sm-dark')}
			borderRadius="lg"
			flex="1"
			{...props}
		>
			<Stack
				spacing="5"
				px={{ base: '4', md: '6' }}
				py={{ base: '5', md: '6' }}
			>
				<Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
					<FormControl id="name">
						<FormLabel>Name</FormLabel>
						<Input defaultValue="" />
					</FormControl>
					<FormControl id="username">
						<FormLabel>Username</FormLabel>
						<Input isDisabled defaultValue="" />
					</FormControl>
				</Stack>
				<FormControl id="bio">
					<FormLabel>Bio</FormLabel>
					<Textarea rows={3} resize="none" />
					<FormHelperText color="subtle">
						Write a short introduction about yourself
					</FormHelperText>
				</FormControl>
				<FormControl id="picture">
					<FormLabel>Picture</FormLabel>
					<Stack
						spacing={{ base: '3', md: '5' }}
						direction={{ base: 'column', sm: 'row' }}
					>
						<Avatar size="lg" src="" />
						<Dropzone width="full" />
					</Stack>
				</FormControl>
			</Stack>
			<Divider />
			<Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
				<Button type="submit" variant="primary">
					Save
				</Button>
			</Flex>
		</Box>
	);
};

export default ProfileFields;
