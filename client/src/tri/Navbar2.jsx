import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';

import { useMeQuery } from '../hooks/queries';

const Navbar = () => {
	const isDesktop = useBreakpointValue({
		base: false,
		lg: true,
	});

	const { data } = useMeQuery();

	return (
		<Box
			as="section"
			pb={{
				base: '12',
				md: '24',
			}}
		>
			<Box
				as="nav"
				role="navigation"
				bg="bg-surface"
				boxShadow={useColorModeValue('sm', 'sm-dark')}
			>
				<Container
					py={{
						base: '4',
						lg: '5',
					}}
				>
					<HStack spacing="10" justify="space-between">
						<Logo />
						{isDesktop ? (
							<Flex justify="space-between" flex="1">
								<ButtonGroup variant="link" spacing="8">
									{['Discover', 'Create', 'Creators', 'About'].map((item) => (
										<Button key={item}>{item}</Button>
									))}
								</ButtonGroup>

								{data?.user ? (
									<h1>{data.user.username}</h1>
								) : (
									<HStack spacing="3">
										<Link to="/login">
											<Button variant="ghost">Sign in</Button>
										</Link>

										<Link to="/register">
											<Button variant="primary">Sign up</Button>
										</Link>
									</HStack>
								)}
							</Flex>
						) : (
							<HStack spacing="3">
								<Link to="/login">
									<Button variant="ghost">Sign in</Button>
								</Link>
								<Link to="/register">
									<Button variant="primary">Sign up</Button>
								</Link>
								<IconButton
									variant="ghost"
									icon={<FiMenu fontSize="1.25rem" />}
									aria-label="Open Menu"
								/>
							</HStack>
						)}
					</HStack>
				</Container>
			</Box>
		</Box>
	);
};

export default Navbar;