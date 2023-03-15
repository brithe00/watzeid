import {
	Box,
	Container,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';

export const PageHeaderNoUser = ({ heading, text }) => (
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
				<Text color="muted">{text}</Text>
			</Stack>
		</Container>
	</Box>
);
