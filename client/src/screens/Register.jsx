import { useState, useRef } from 'react';
import {
	Button,
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '../components/Logo';
import AlertState from '../components/Alert';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '../api/user';

import { useMutation } from 'react-query';
import { useMeQuery } from '../hooks/queries';

const Register = () => {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const registerMutation = useMutation({
		mutationFn: register,
	});

	const handleSubmit = () => {
		registerMutation.mutate({
			username: usernameRef.current.value,
			email: emailRef.current.value,
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
					<Stack spacing="6" align="center">
						<Logo />
						<Stack spacing="3" textAlign="center">
							<Heading
								size={useBreakpointValue({
									base: 'xs',
									md: 'sm',
								})}
							>
								Create an account
							</Heading>
							<Text color="muted">Start making your dreams come true</Text>
						</Stack>
					</Stack>
					{registerMutation.isError ? (
						<AlertState
							status="error"
							message={registerMutation.error.response.data.message}
						/>
					) : null}
					{registerMutation.isSuccess ? (
						<>
							<AlertState status="success" message="Success ! Redirecting..." />
							{redirect()}
						</>
					) : null}
					<Stack spacing="6">
						<Stack spacing="5">
							<FormControl isRequired>
								<FormLabel htmlFor="username">Username</FormLabel>
								<Input
									id="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									ref={usernameRef}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									ref={emailRef}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="password">Password</FormLabel>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									ref={passwordRef}
								/>
								<FormHelperText color="muted">
									At least 8 characters long
								</FormHelperText>
							</FormControl>
						</Stack>
						<Stack spacing="4">
							<Button
								variant="primary"
								onClick={() => handleSubmit()}
								isLoading={registerMutation.isLoading}
							>
								Create account
							</Button>
						</Stack>
					</Stack>
					<HStack justify="center" spacing="1">
						<Text fontSize="sm" color="muted">
							Already have an account?
						</Text>
						<Link to="/login">
							<Button variant="link" colorScheme="blue" size="sm">
								Log in
							</Button>
						</Link>
					</HStack>
				</Stack>
			</Container>
		</>
	);
};

export default Register;
