import { Flex } from '@chakra-ui/react';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
	return (
		<Flex direction="column" flex="1">
			<Navbar />
			<main>{children}</main>
			<Footer />
		</Flex>
	);
};

export default Layout;
