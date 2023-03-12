import { Box, Container, Stack, StackDivider, Text } from '@chakra-ui/react';

import ProfileFieldsPersonal from '../components/ProfileFieldsPersonal';
import ProfileFields from '../components/ProfileFields';

const Profile = () => {
	return (
		<Container py={{ base: '4', md: '8' }}>
			<Stack spacing="5" divider={<StackDivider />}>
				<Stack
					direction={{ base: 'column', lg: 'row' }}
					spacing={{ base: '5', lg: '8' }}
					justify="space-between"
				>
					<Box flexShrink={0}>
						<Text fontSize="lg" fontWeight="medium">
							Your Profile
						</Text>
						<Text color="muted" fontSize="sm">
							Tell others who you are
						</Text>
					</Box>
					<ProfileFields maxW={{ lg: '3xl' }} />
				</Stack>

				<Stack
					direction={{ base: 'column', lg: 'row' }}
					spacing={{ base: '5', lg: '8' }}
					justify="space-between"
				>
					<Box flexShrink={0}>
						<Text fontSize="lg" fontWeight="medium">
							Your Personal Informations
						</Text>
						<Text color="muted" fontSize="sm">
							Informations about you
						</Text>
					</Box>
					<ProfileFieldsPersonal maxW={{ lg: '3xl' }} />
				</Stack>
			</Stack>
		</Container>
	);
};

export default Profile;
