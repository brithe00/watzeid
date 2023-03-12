import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteMe } from '../api/user';
import AlertState from './Alert';
import Spinner from './Spinner';

const PersonalInfoCard = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const navigate = useNavigate();

	const { data } = props;

	const color = useColorModeValue('sm', 'sm-dark');

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteMe,
		onSuccess: () => {
			navigate('/');
			localStorage.removeItem('token');
			queryClient.resetQueries(['me']);
		},
	});

	if (data.status === 'loading')
		return (
			<Container>
				<Spinner />
			</Container>
		);

	if (data.status === 'error')
		return (
			<Container>
				<AlertState status="error" message={data.error.response.data.message} />
			</Container>
		);

	return (
		<Box
			bg="bg-surface"
			boxShadow={color}
			borderRadius="lg"
			flex="1"
			{...props}
		>
			<Stack
				spacing="5"
				px={{
					base: '4',
					md: '6',
				}}
				py={{
					base: '5',
					md: '6',
				}}
			>
				<FormControl id="username">
					<FormLabel>Username</FormLabel>
					<InputGroup>
						<Input defaultValue={`@${data.data.user.username}`} isDisabled />
					</InputGroup>
				</FormControl>
				<FormControl id="email">
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<Input defaultValue={data.data.user.email} isDisabled />
					</InputGroup>
				</FormControl>
				<Button colorScheme="red" onClick={onOpen}>
					Delete Account
				</Button>

				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize="lg" fontWeight="bold">
								Delete Account
							</AlertDialogHeader>

							<AlertDialogBody>
								Are you sure? You can't undo this action afterwards.
							</AlertDialogBody>
							<AlertDialogBody>
								This will delete all your Posts, Likes, Comments...
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose}>
									Cancel
								</Button>
								<Button
									colorScheme="red"
									ml={3}
									onClick={() => mutation.mutate()}
									isLoading={mutation.isLoading}
								>
									Delete
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Stack>
		</Box>
	);
};

export default PersonalInfoCard;
