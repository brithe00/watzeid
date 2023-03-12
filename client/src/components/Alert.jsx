import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const AlertState = ({ status, message }) => {
	return (
		<Alert status={status}>
			<AlertIcon />
			<AlertTitle>{message}</AlertTitle>
		</Alert>
	);
};

export default AlertState;
