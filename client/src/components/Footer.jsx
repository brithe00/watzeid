import {
	ButtonGroup,
	Container,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Logo } from '../components/Logo';

const Footer = () => (
	<Container
		as="footer"
		role="contentinfo"
		py={{
			base: '12',
			md: '16',
		}}
	>
		<Stack
			spacing={{
				base: '4',
				md: '5',
			}}
		>
			<Stack justify="space-between" direction="row" align="center">
				<Logo />
				<ButtonGroup variant="ghost">
					<IconButton
						as="a"
						href="https://linkedin.com/in/brian-thellier"
						aria-label="LinkedIn"
						icon={<FaLinkedin fontSize="1.25rem" />}
						target="_blank"
					/>
					<IconButton
						as="a"
						href="https://github.com/brithe00"
						aria-label="GitHub"
						icon={<FaGithub fontSize="1.25rem" />}
						target="_blank"
					/>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="subtle">
				&copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
				reserved.
			</Text>
		</Stack>
	</Container>
);

export default Footer;
