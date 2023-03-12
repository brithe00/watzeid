import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import { theme } from '../src/theme/index';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
	<QueryClientProvider client={queryClient}>
		<ChakraProvider theme={theme}>
			<App />
			<ReactQueryDevtools />
		</ChakraProvider>
	</QueryClientProvider>
);
