import {
	Avatar,
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	Icon,
	Input,
	InputGroup,
	Square,
	Stack,
	Text,
	Textarea,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { updateMe } from '../api/user';
import AlertState from './Alert';
// eslint-disable-next-line no-unused-vars
import Spinner from './Spinner';

const PublicInfoCard = (props) => {
	const queryClient = useQueryClient();

	const nameRef = useRef();
	const bioRef = useRef();
	// eslint-disable-next-line no-unused-vars
	const profilePictureRef = useRef();

	const [name, setName] = useState('');
	const [bio, setBio] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	const [uploading, setUploading] = useState(false);

	const updateMeMutation = useMutation({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries(['me']);
		},
	});

	const updateMeHandler = () => {
		updateMeMutation.mutate({
			name: nameRef.current.value,
			bio: bioRef.current.value,
			profilePicture: profilePicture,
		});
	};

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.post(
				'http://localhost:8000/api/uploads',
				formData,
				config
			);

			setProfilePicture(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	const { data } = props;

	const color = useColorModeValue('sm', 'sm-dark');

	const colorDropzone = useColorModeValue('white', 'gray.800');

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
				{updateMeMutation.status === 'success' && (
					<AlertState
						status="success"
						message="Profile successfully updated !"
					/>
				)}
				{updateMeMutation.status === 'error' && (
					<AlertState
						status="error"
						message="Error while updating your profile !"
					/>
				)}
				<FormControl id="name">
					<FormLabel>Name</FormLabel>
					<InputGroup>
						<Input
							ref={nameRef}
							type="text"
							value={name || data.data.user.name}
							onChange={(e) => setName(e.target.value)}
						/>
						{/* <Input defaultValue={data.data.user.name} /> */}
					</InputGroup>
				</FormControl>
				<FormControl id="bio">
					<FormLabel>Bio</FormLabel>
					<Textarea
						ref={bioRef}
						rows={3}
						resize="none"
						type="text"
						value={bio || data.data.user.bio}
						onChange={(e) => setBio(e.target.value)}
					/>
					{/* <Textarea rows={3} resize="none" defaultValue={data.data.user.bio} /> */}
					<FormHelperText color="subtle">
						Write a short introduction about yourself
					</FormHelperText>
				</FormControl>
				<FormControl id="picture">
					<FormLabel>Picture</FormLabel>
					<Stack
						spacing={{
							base: '3',
							md: '5',
						}}
						direction={{
							base: 'column',
							sm: 'row',
						}}
					>
						<Avatar
							size="lg"
							src={profilePicture || data.data.user.profilePicture}
						/>
						{/* DROPZONE */}
						<Center
							width="full"
							borderWidth="1px"
							borderRadius="lg"
							px="6"
							py="4"
							bg={colorDropzone}
							{...props}
						>
							<VStack spacing="3">
								<Square size="10" bg="bg-subtle" borderRadius="lg">
									<Icon as={FiUploadCloud} boxSize="5" color="muted" />
								</Square>
								<VStack spacing="1">
									<HStack spacing="1" whiteSpace="nowrap">
										<Button
											variant="link"
											colorScheme="blue"
											size="sm"
											as="label"
											htmlFor="upload-button"
											cursor="pointer"
										>
											Click to upload
										</Button>
										<Text fontSize="sm" color="muted">
											or drag and drop
										</Text>
									</HStack>
									<Text fontSize="xs" color="muted">
										PNG, JPG or GIF up to 2MB
									</Text>
								</VStack>
							</VStack>
							<Input
								type="file"
								id="upload-button"
								onChange={uploadFileHandler}
								display="none"
							/>
						</Center>
					</Stack>
				</FormControl>
			</Stack>
			<Divider />
			<Flex
				direction="row-reverse"
				py="4"
				px={{
					base: '4',
					md: '6',
				}}
			>
				<Button
					type="submit"
					variant="primary"
					onClick={() => updateMeHandler()}
					isLoading={uploading || updateMeMutation.isLoading}
				>
					Save
				</Button>
			</Flex>
		</Box>
	);
};

export default PublicInfoCard;
