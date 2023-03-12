import { Box, Container, Stack, StackDivider, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import PersonalInfoCard from '../components/PersonalInfoCard';
import PublicInfoCard from '../components/PublicInfoCard';

import { useMeQuery } from '../hooks/queries';

const Informations = () => {
	return (
		<Layout>
			<Container
				py={{
					base: '4',
					md: '8',
				}}
			>
				<Stack spacing="5" divider={<StackDivider />}>
					<Stack
						direction={{
							base: 'column',
							lg: 'row',
						}}
						spacing={{
							base: '5',
							lg: '8',
						}}
						justify="space-between"
					>
						<Box flexShrink={0}>
							<Text fontSize="lg" fontWeight="medium">
								Public Informations
							</Text>
							<Text color="muted" fontSize="sm">
								Your public informations, you can edit them
							</Text>
						</Box>
						<PublicInfoCard
							maxW={{
								lg: '3xl',
							}}
							data={useMeQuery()}
						/>
					</Stack>

					<Stack
						direction={{
							base: 'column',
							lg: 'row',
						}}
						spacing={{
							base: '5',
							lg: '8',
						}}
						justify="space-between"
					>
						<Box flexShrink={0}>
							<Text fontSize="lg" fontWeight="medium">
								Private Informations
							</Text>
							<Text color="muted" fontSize="sm">
								Your private informations, you can't edit them
							</Text>
						</Box>
						<PersonalInfoCard
							maxW={{
								lg: '3xl',
							}}
							data={useMeQuery()}
						/>
					</Stack>
				</Stack>
			</Container>
		</Layout>
	);
};

export default Informations;
