import {
	AspectRatio,
	Box,
	Button,
	Container,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Image,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';

// name
// imageUrl
// link

const ItemBox = () => {
	return (
		<>
			<AspectRatio ratio={1} width="92px">
				<Image
					src="https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
					alt="oui"
					borderRadius="md"
				/>
			</AspectRatio>

			<FormControl isRequired>
				<FormLabel htmlFor="name">Name</FormLabel>
				<Input id="name" type="text" placeholder="Enter the name of the item" />
			</FormControl>
			<FormControl>
				<FormLabel htmlFor="link">Link</FormLabel>
				<Input
					id="link"
					type="text"
					placeholder="Enter the link to redirect to the item"
				/>
			</FormControl>
		</>
	);
};

const SecondStep = () => {
	const [itemBoxList, setItemBoxList] = useState([]);

	const addItemLineButton = () => {
		const list = itemBoxList;
		setItemBoxList(list.concat(<ItemBox key={itemBoxList.length} />));
	};

	return (
		<>
			<Box bg="bg-surface">
				<Container
					py={{
						base: '4',
						md: '8',
					}}
				>
					<HStack>
						<Divider />
						<Button
							flexShrink={0}
							variant="secondary"
							leftIcon={<FiPlus fontSize="1.25rem" />}
							onClick={() => addItemLineButton()}
						>
							New Item Line
						</Button>
						<Divider />
					</HStack>
					{itemBoxList}
				</Container>
			</Box>
		</>
	);
};

export default SecondStep;
