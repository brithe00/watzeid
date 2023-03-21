import { Box, Container, HStack } from '@chakra-ui/react';
import FirstStep from '../components/FirstStep';
import { Gallery } from '../components/Gallery';
import SecondStep from '../components/SecondStep';
import { Step } from '../components/Step';
import { useStep } from '../hooks/useStep';

const CreatePost = () => {
	const numberOfSteps = 5;
	const [currentStep, { setStep }] = useStep({
		maxStep: numberOfSteps,
		initialStep: 0,
	});
	return (
		<Container>
			<Box bg="bg-surface">
				<Container
					display="flex"
					justifyContent="center"
					alignItems="center"
					minH="40"
				>
					<HStack spacing="0" justify="space-evenly" flex="1">
						{[...Array(numberOfSteps)].map((_, id) => (
							<Step
								key={id}
								cursor="pointer"
								onClick={() => setStep(id)}
								isActive={currentStep === id}
								isCompleted={currentStep > id}
								isLastStep={numberOfSteps === id + 1}
							/>
						))}
					</HStack>
				</Container>
				{/* <FirstStep /> */}
				<SecondStep />
			</Box>
		</Container>
	);
};

export default CreatePost;
