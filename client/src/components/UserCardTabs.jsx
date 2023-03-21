import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import CommentsTab from './CommentsTab';
import LikesTabs from './LikesTabs';
import PostsTabs from './PostsTabs';

const UserCardTabs = () => {
	return (
		<Box as="section" mt="6">
			<Tabs>
				<TabList>
					<Tab>Posts</Tab>
					<Tab>Likes</Tab>
					<Tab>Comments</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<PostsTabs />
					</TabPanel>
					<TabPanel>
						<LikesTabs />
					</TabPanel>
					<TabPanel>
						<CommentsTab />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default UserCardTabs;
