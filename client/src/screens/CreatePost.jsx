import {
	AspectRatio,
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	InputGroup,
	SimpleGrid,
	Stack,
	Text,
	Textarea,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { useRef, useState, forwardRef } from 'react';

import Uploady, { useItemFinishListener } from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';

import { useImagesStore } from '../store/store';
import { useMutation } from 'react-query';
import { createPost } from '../api/post';
import AlertState from '../components/Alert';

import { useNavigate } from 'react-router-dom';

const UploadButton = asUploadButton(
	forwardRef((props, ref) => (
		<Button
			variant="link"
			colorScheme="blue"
			size="sm"
			cursor="pointer"
			{...props}
			ref={ref}
		>
			Click to upload
		</Button>
	))
);

const UploadyEvent = () => {
	const { addImages } = useImagesStore();

	useItemFinishListener((item) => {
		addImages(
			item.uploadResponse.data.secure_url,
			item.uploadResponse.data.asset_id
		);
	});

	return <UploadButton />;
};

const CreatePost = () => {
	const { images } = useImagesStore();

	const navigate = useNavigate();

	const [caption, setCaption] = useState('');
	const inputRef = useRef();

	const color = useColorModeValue('sm', 'sm-dark');
	const colorDropzone = useColorModeValue('white', 'gray.800');

	const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
	const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

	const mutation = useMutation({
		mutationFn: ({ caption, media }) => createPost(caption, media),
		onSuccess: (response) => {
			navigate(`/post/${response.data.id}`);
		},
	});

	return (
		<Container>
			<Box bg="bg-surface" boxShadow={color} borderRadius="lg" flex="1">
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
					<Heading as="h1" size="sm">
						New Post
					</Heading>

					<FormControl id="name">
						<FormLabel>Caption</FormLabel>
						<InputGroup>
							<Textarea
								placeholder="Add a caption..."
								resize="none"
								type="text"
								value={caption}
								onChange={(e) => setCaption(e.target.value)}
							/>
						</InputGroup>
					</FormControl>

					{images.length > 0 ? (
						<SimpleGrid
							columns={{
								base: 2,
								md: 4,
							}}
							spacing="2"
						>
							{images.map((image) => (
								<Box key={image.id}>
									<AspectRatio ratio={1}>
										<Image src={image.url} />
									</AspectRatio>
								</Box>
							))}
						</SimpleGrid>
					) : (
						<Center width="full" borderWidth="1px" height="20vh">
							<Text fontSize="lg" color="muted">
								Images will appear here.
							</Text>
						</Center>
					)}

					<Center
						width="full"
						borderWidth="1px"
						borderRadius="lg"
						px="6"
						py="4"
						bg={colorDropzone}
					>
						<VStack spacing="1">
							<HStack spacing="1" whiteSpace="nowrap">
								<Input
									ref={inputRef}
									id="images-files"
									type="file"
									multiple
									display="none"
								/>
								<Uploady
									multiple
									destination={{
										url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
										params: {
											upload_preset: UPLOAD_PRESET,
										},
									}}
								>
									<UploadyEvent />
								</Uploady>
							</HStack>
							<Text fontSize="xs" color="muted">
								PNG, JPG or JPEG files
							</Text>
						</VStack>
					</Center>
				</Stack>
				<Divider />
				{mutation.status === 'error' && (
					<Box p="2">
						<AlertState
							status="error"
							message="There is a problem ! Refresh the page"
						/>
					</Box>
				)}
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
						onClick={() => {
							mutation.mutate({
								caption: caption,
								media: images,
							});
						}}
						isLoading={mutation.isLoading}
					>
						Publish
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};

export default CreatePost;
