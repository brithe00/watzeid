import { useQuery } from 'react-query';

import { me } from '../api/user';

export const useMeQuery = () => {
	return useQuery({
		queryKey: ['me'],
		queryFn: () => me(),
	});
};
