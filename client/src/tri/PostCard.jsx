import { Box } from '@chakra-ui/react';
import Gallery from '../components/Gallery';
import UserHeader from './UserHeader';
export const images = [
	{
		id: '01',
		src: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '02',
		src: 'https://plus.unsplash.com/premium_photo-1669703777692-0289d224bcc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '03',
		src: 'https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '04',
		src: 'https://images.unsplash.com/photo-1569411032431-07598b0012c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '05',
		src: 'https://images.unsplash.com/photo-1565440962783-f87efdea99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80',
		alt: 'Awesome watch',
	},
	{
		id: '06',
		src: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
		alt: 'Awesome watch',
	},
];

const { data } = {
	data: {
		id: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
		caption: 'testttttttt',
		points: 0,
		voteStatus: null,
		userId: '2463ba3c-9039-4448-9890-a05dc6e60c35',
		createdAt: '2023-01-22T18:14:38.710Z',
		updatedAt: '2023-01-22T18:14:38.710Z',
		media: [
			{
				id: '9684bba7-fe56-4ec4-b4f4-0fe47a698379',
				url: 'test1',
				type: 'IMAGE',
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
			{
				id: 'b0331758-d15b-422d-9316-dd3c38cde97a',
				url: 'test2',
				type: 'IMAGE',
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
			{
				id: 'b9d77960-6d51-48fa-84ec-06e4ed841ff9',
				url: 'test3',
				type: 'IMAGE',
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
		],
		items: [
			{
				id: '96ee93a4-9cab-4c2f-99d4-a94b53f2728f',
				name: 'gigatest',
				imageUrl: null,
				link: null,
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
			{
				id: 'ebf0d00b-f9bf-4746-a3cf-89da1a5163de',
				name: 'megatest',
				imageUrl: null,
				link: null,
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
			{
				id: '29b61a9b-6975-412a-85f6-d7377a6b7b9f',
				name: '++test',
				imageUrl: null,
				link: null,
				postId: 'b3ea8ac3-2b0e-4cd6-abc3-fb6dcf5a757e',
				createdAt: '2023-01-22T18:14:38.710Z',
				updatedAt: '2023-01-22T18:14:38.710Z',
			},
		],
	},
};

const PostCard = () => {
	return (
		<>
			<Box
				maxW="3xl"
				mx="auto"
				px={{
					base: '4',
					md: '8',
					lg: '12',
				}}
				py={{
					base: '6',
					md: '8',
					lg: '12',
				}}
			>
				<UserHeader timestamp={data.createdAt} />
				<Gallery images={images} />
			</Box>
		</>
	);
};

export default PostCard;
