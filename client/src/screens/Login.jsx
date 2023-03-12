import { useState, useRef } from 'react';
import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import AlertState from '../components/Alert';

import { login } from '../api/user';

import { useMutation } from 'react-query';
import { useMeQuery } from '../hooks/queries';

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const loginMutation = useMutation({
		mutationFn: login,
	});

	const handleSubmit = () => {
		loginMutation.mutate({
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		});
	};

	const navigate = useNavigate();

	const redirect = () => {
		setTimeout(() => {
			return navigate('/');
		}, 1000);
	};

	const { data } = useMeQuery();

	return (
		<>
			{data?.user ? redirect('/') : null}
			<Container
				maxW="md"
				py={{
					base: '12',
					md: '24',
				}}
			>
				<Stack spacing="8">
					<Stack spacing="6">
						<Logo />
						<Stack
							spacing={{
								base: '2',
								md: '3',
							}}
							textAlign="center"
						>
							<Heading
								size={useBreakpointValue({
									base: 'xs',
									md: 'sm',
								})}
							>
								Log in to your account
							</Heading>
							<Text color="muted">Start making your dreams come true</Text>
						</Stack>
					</Stack>
					{loginMutation.isError ? (
						<AlertState
							status="error"
							message={loginMutation.error.response.data.message}
						/>
					) : null}
					{loginMutation.isSuccess ? (
						<>
							<AlertState status="success" message="Success ! Redirecting..." />
							{redirect()}
						</>
					) : null}
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl>
								<FormLabel htmlFor="name">Username</FormLabel>
								<Input
									id="name"
									placeholder="Enter your username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									ref={usernameRef}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="password">Password</FormLabel>
								<Input
									id="password"
									placeholder="********"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									ref={passwordRef}
								/>
							</FormControl>
						</Stack>
						{/* <HStack justify="space-between">
				<Button variant="link" colorScheme="blue" size="sm">
					Forgot password
				</Button>
			</HStack> */}
						<Stack spacing="4">
							<Button
								variant="primary"
								onClick={() => handleSubmit()}
								isLoading={loginMutation.isLoading}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
					<HStack spacing="1" justify="center">
						<Text fontSize="sm" color="muted">
							Don't have an account?
						</Text>
						<Link to="/register">
							<Button variant="link" colorScheme="blue" size="sm">
								Sign up
							</Button>
						</Link>
					</HStack>
				</Stack>
			</Container>
		</>
	);
};

export default Login;
