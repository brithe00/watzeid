const baseStyle = {
	track: {
		borderRadius: 'base',
	},
};

const variants = {
	solid: {
		track: {
			bg: 'bg-muted',
		},
	},
	'on-accent': {
		track: {
			bg: 'transparent',
		},
		filledTrack: {
			bg: 'brand.50',
		},
	},
};

const defaultProps = {
	colorScheme: 'brand',
	variant: 'solid',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	variants,
	baseStyle,
	defaultProps,
};
