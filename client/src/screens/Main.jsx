import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Container,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';

const Main = (props) => {
	return (
		<Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
			<Container flex="1">
				<Alert
					status="info"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					borderRadius="lg"
					boxShadow={useColorModeValue('sm', 'sm-dark')}
					height="200px"
				>
					<AlertIcon boxSize="40px" mr={0} />
					<AlertTitle mt={4} mb={1} fontSize="lg">
						You have to create an account to access the app !
					</AlertTitle>
					<AlertDescription maxWidth="sm">
						You can put fake data, it's totally fine. Just remember your
						username and password obviously !
					</AlertDescription>
				</Alert>
			</Container>
		</Flex>
	);
};

export default Main;