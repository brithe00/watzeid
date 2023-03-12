import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseStyle = (props: StyleFunctionProps) => ({
	label: {
		color: 'muted',
		fontWeight: 'medium',
	},
	control: {
		bg: mode('white', 'gray.800')(props),
		borderRadius: 'base',
	},
});

const sizes = {
	md: {
		label: {
			fontSize: 'sm',
		},
	},
};

const defaultProps = {
	colorScheme: 'brand',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle,
	sizes,
	defaultProps,
};
