import { Spinner as SpinnerCircular, Center } from '@chakra-ui/react';

const Spinner = () => {
	return (
		<Center>
			<SpinnerCircular thickness="4px" speed="0.65s" size="xl" />
		</Center>
	);
};

export default Spinner;
