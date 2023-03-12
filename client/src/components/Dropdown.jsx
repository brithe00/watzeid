import {
	Avatar,
	Button,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useColorMode,
} from '@chakra-ui/react';

import {
	BsPlusSquare,
	BsPerson,
	BsInfoCircle,
	BsFileText,
	BsHeart,
	BsChatDots,
	BsBoxArrowRight,
} from 'react-icons/bs';

import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

import { Link, useNavigate } from 'react-router-dom';

import { useQuery, useQueryClient } from 'react-query';
import { me } from '../api/user';

const Dropdown = ({ image }) => {
	const { toggleColorMode } = useColorMode();

	const navigate = useNavigate();

	const mode = useColorMode().colorMode;

	const meQuery = useQuery({
		queryKey: ['me'],
		queryFn: () => me(),
	});

	const queryClient = useQueryClient();

	const logout = () => {
		localStorage.removeItem('token');
		queryClient.removeQueries('me');
		navigate('/');
	};

	if (meQuery.status === 'loading' || meQuery.status === 'error')
		return (
			<Flex justify="space-between">
				<HStack spacing="3">
					<Link to="/login">
						<Button variant="ghost">Sign in</Button>
					</Link>

					<Link to="/register">
						<Button variant="primary">Sign up</Button>
					</Link>
				</HStack>
			</Flex>
		);

	return (
		<Menu closeOnSelect={true}>
			<MenuButton>
				<Avatar src={image} />
			</MenuButton>
			<MenuList>
				<MenuGroup title="Settings" textAlign="center">
					<MenuItem icon={<BsPlusSquare />}>New Post</MenuItem>
					<Link to={`/${meQuery.data.user.username}`}>
						<MenuItem icon={<BsPerson />}>Your Profile</MenuItem>
					</Link>
					<Link to="/profile">
						<MenuItem icon={<BsInfoCircle />}>Your Informations</MenuItem>
					</Link>

					<MenuItem icon={<BsFileText />}>Your Posts</MenuItem>
					<MenuItem icon={<BsHeart />}>Your Likes</MenuItem>
					<Link to="/comments">
						<MenuItem icon={<BsChatDots />}>Your Comments</MenuItem>
					</Link>
				</MenuGroup>
				<MenuDivider />
				<MenuGroup title="Options" textAlign="center">
					<MenuItem
						icon={mode === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
						closeOnSelect={false}
						onClick={toggleColorMode}
					>
						{mode === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
					</MenuItem>
					<MenuItem icon={<BsBoxArrowRight />} onClick={logout}>
						Logout
					</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	);
};

export default Dropdown;
