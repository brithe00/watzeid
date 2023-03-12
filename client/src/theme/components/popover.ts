import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseStyle = (props: StyleFunctionProps) => ({
	content: {
		borderWidth: '1px',
		boxShadow: mode('lg', 'lg-dark')(props),
		borderRadius: 'lg',
		background: 'bg-surface',
		overflow: 'hidden',
	},
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle,
};
