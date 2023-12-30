import { Box, Container, Grid, Text } from '@chakra-ui/react';
import { motion, useAnimate } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import { Answer, Clue } from './types';

type RevealProps = {
  clue: Clue;
  answer: Answer;
  onComplete: (params: { clue: Clue; answer: Answer }) => void;
};

const Reveal: React.FC<RevealProps> = ({ clue, answer, onComplete }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      clue.answer === answer.id
        ? [['.reveal', { scale: 3, opacity: 0 }, { duration: 0.3, at: 1 }]]
        : [
            [
              '.reveal',
              { x: [0, 30, -30, 30, -30, 0] },
              { type: 'spring', at: 1 },
            ],
          ],
    ).then(() => onComplete({ clue, answer }));
  }, [clue, answer, animate, onComplete]);

  return (
    <Grid ref={scope} pos="fixed" inset={0} placeContent="center" zIndex={10}>
      <Container
        className="reveal"
        display="flex"
        flexDirection="column"
        w={{ base: 'sm', md: 'lg' }}
        gap={2}
      >
        <Candidate label="Clue" layoutId={`clue-${clue.id}`}>
          {clue.clue}
        </Candidate>
        <Candidate label="Answer" layoutId={`answer-${answer.id}`}>
          {answer.answer}
        </Candidate>
      </Container>
    </Grid>
  );
};

type CandidateProps = PropsWithChildren<{
  label: string;
  layoutId: string;
}>;

const Candidate: React.FC<CandidateProps> = ({ label, children, ...props }) => {
  return (
    <Box
      as={motion.div}
      px={4}
      py={2}
      rounded="md"
      shadow="md"
      bg="var(--highlight-color-subtle)"
      border="1px solid transparent"
      borderColor="var(--highlight-color)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      {...props}
    >
      <Text
        as="small"
        display="block"
        fontSize="sm"
        textTransform="uppercase"
        color="text.secondary"
        letterSpacing="0.1em"
      >
        {label}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
};

export default Reveal;
