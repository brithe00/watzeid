import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Icon,
	Square,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { Gallery } from './Gallery';

const images = [
	{
		id: '01',
		src: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '02',
		src: 'https://images.unsplash.com/photo-1451290337906-ac938fc89bce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '03',
		src: 'https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '04',
		src: 'https://images.unsplash.com/photo-1569411032431-07598b0012c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '05',
		src: 'https://images.unsplash.com/photo-1565440962783-f87efdea99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '06',
		src: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
		alt: 'Awesome watch',
	},
];

const FirstStep = () => {
	const colorDropzone = useColorModeValue('white', 'gray.800');

	return (
		<Box
			maxW="3xl"
			mx="auto"
			px={{
				base: '4',
				md: '8',
				lg: '12',
			}}
			py={{
				base: '6',
				md: '8',
				lg: '12',
			}}
		>
			{/* ajouter des alertes informations */}
			<Gallery images={images} />
			<Center
				mt="6"
				width="full"
				borderWidth="1px"
				borderRadius="lg"
				px="6"
				py="4"
				bg={colorDropzone}
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
								cursor="pointer"
							>
								Click to upload
							</Button>
							<Text fontSize="sm" color="muted">
								or drag and drop
							</Text>
						</HStack>
						<Text fontSize="xs" color="muted">
							PNG, JPG or JPEG up to 2MB
						</Text>
					</VStack>
				</VStack>
			</Center>
			<Flex py="4">
				<Button width="full">Next</Button>
			</Flex>
		</Box>
	);
};

export default FirstStep;
