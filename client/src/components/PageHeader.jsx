import {
	Box,
	Container,
	Heading,
	Link,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';

import { Link as ReachLink } from 'react-router-dom';

export const PageHeader = ({ heading, text, username }) => (
	<Box as="section">
		<Container>
			<Stack spacing="1">
				<Heading
					size={useBreakpointValue({
						base: 'xs',
						md: 'sm',
					})}
					fontWeight="medium"
				>
					{heading}
				</Heading>
				<Text color="muted">
					{text}
					<Link as={ReachLink} to={`/${username}`}>
						<b>
							<em>@{username}</em>
						</b>
					</Link>
				</Text>
			</Stack>
		</Container>
	</Box>
);
