import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateMe } from '../api/user';
import AlertState from './Alert';
// eslint-disable-next-line no-unused-vars
import Dropzone from './Dropzone';
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
						{/* <Dropzone width="full" /> */}
						<Input type="file" onChange={uploadFileHandler} />
						{uploading && <Spinner />}
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
					isLoading={updateMeMutation.isLoading}
				>
					Save
				</Button>
			</Flex>
		</Box>
	);
};

export default PublicInfoCard;
