import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useBreakpointValue,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Logo } from './Logo';
import Dropdown from './Dropdown';

import { Link } from 'react-router-dom';

import { useMeQuery } from '../hooks/queries';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Navbar = () => {
	const { toggleColorMode } = useColorMode();

	const isDesktop = useBreakpointValue({
		base: false,
		lg: true,
	});

	const { data } = useMeQuery();

	const mode = useColorMode().colorMode;

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
						base: '3',
						lg: '4',
					}}
				>
					<HStack spacing="10" justify="space-between">
						{isDesktop ? (
							<>
								<Logo />
								<Flex justify="space-between" flex="1" alignItems="center">
									<ButtonGroup variant="ghost" spacing="1">
										<Link to="/">
											<Button>Discover</Button>
										</Link>
										{/* <Button aria-current="page">Dashboard</Button> */}
										<Link to="/users">
											<Button>Users</Button>
										</Link>
									</ButtonGroup>

									{data?.user ? (
										<Dropdown image={data.user.profilePicture} />
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
							</>
						) : data?.user ? (
							<>
								<Logo />
								<Flex justify="space-between" flex="1" alignItems="center">
									<ButtonGroup variant="ghost" spacing="1">
										<Link to="/">
											<Button>Discover</Button>
										</Link>
										{/* <Button aria-current="page">Dashboard</Button> */}
										<Link to="/users">
											<Button>Users</Button>
										</Link>
									</ButtonGroup>
									<Dropdown image={data.user.profilePicture} />
								</Flex>
							</>
						) : (
							<Flex justify="space-between" flex="1" alignItems="center">
								<Menu>
									<MenuButton
										as={IconButton}
										aria-label="Menu"
										icon={<FiMenu />}
										variant="ghost"
									/>
									<MenuList>
										<MenuGroup>
											<Link to="/">
												<MenuItem>Discover</MenuItem>
											</Link>
											<Link to="/users">
												<MenuItem>Users</MenuItem>
											</Link>
										</MenuGroup>
										<MenuDivider />
										<MenuItem
											icon={
												mode === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />
											}
											closeOnSelect={false}
											onClick={toggleColorMode}
										>
											{mode === 'dark'
												? 'Toggle Light Mode'
												: 'Toggle Dark Mode'}
										</MenuItem>
									</MenuList>
								</Menu>
								<HStack spacing="3">
									<Link to="/login">
										<Button variant="ghost">Sign in</Button>
									</Link>
									<Link to="/register">
										<Button variant="primary">Sign up</Button>
									</Link>
								</HStack>
							</Flex>
						)}
					</HStack>
					{/* <Flex justify="space-between">
						<HStack spacing="4">
							<Logo />
							{isDesktop && (
								<ButtonGroup variant="ghost" spacing="1">
									<Button>Home</Button>
									<Button aria-current="page">Dashboard</Button>
									<Button>Tasks</Button>
									<Button>Bookmarks</Button>
									<Button>Users</Button>
								</ButtonGroup>
							)}
						</HStack>
						{isDesktop ? (
							<HStack spacing="4">
								<ButtonGroup variant="ghost" spacing="1">
									<IconButton
										icon={<FiSearch fontSize="1.25rem" />}
										aria-label="Search"
									/>
									<IconButton
										icon={<FiSettings fontSize="1.25rem" />}
										aria-label="Settings"
									/>
									<IconButton
										icon={<FiHelpCircle fontSize="1.25rem" />}
										aria-label="Help Center"
									/>
								</ButtonGroup>
								<Avatar
									boxSize="10"
									name="Christoph Winston"
									src="https://tinyurl.com/yhkm2ek8"
								/>
							</HStack>
						) : (
							<IconButton
								variant="ghost"
								icon={<FiMenu fontSize="1.25rem" />}
								aria-label="Open Menu"
							/>
						)}
					</Flex> */}
				</Container>
			</Box>
		</Box>
	);
};

export default Navbar;
