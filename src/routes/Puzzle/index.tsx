import { Container, Heading, ListItem, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { puzzleRoute } from '..';
import PickableList from './PickableList';
import StickyHeading from './StickyHeading';
import { Answer, Clue } from './types';
import Reveal from './Reveal';

const Puzzle: React.FC = () => {
  const { puzzle } = puzzleRoute.useLoaderData();
  const container = useRef<HTMLDivElement>(null);

  const [selectedClueHeight, setSelectedClueHeight] = useState(0);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [selectedAnswerHeight, setSelectedAnswerHeight] = useState(0);

  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    if (selectedClue && selectedAnswer) {
      setRevealing(true);
    }
  }, [selectedClue, selectedAnswer]);

  const revealComplete = () => {
    setRevealing(false);
    setTimeout(() => {
      setSelectedClue(null);
      setSelectedAnswer(null);
    }, 300);
  };

  return (
    <Stack
      ref={container}
      bg="background.base"
      color="text.primary"
      style={
        {
          '--selected-clue-height': `${selectedClueHeight}px`,
          '--selected-answer-height': `${selectedAnswerHeight}px`,
        } as CSSProperties
      }
    >
      <Container as="header" py={3}>
        <Stack pl={12}>
          <Heading as="h1">
            <Text
              as="small"
              display="block"
              fontSize="sm"
              fontWeight="normal"
              color="text.secondary"
            >
              {puzzle.year}
            </Text>{' '}
            {puzzle.title}
          </Heading>
          <Text>{puzzle.description}</Text>
        </Stack>
      </Container>
      <Container>
        <StickyHeading top={0}>Clues</StickyHeading>
        <PickableList
          items={puzzle.clues}
          selected={selectedClue}
          onSelect={setSelectedClue}
          onMeasure={setSelectedClueHeight}
        >
          {(clue, _i, { children, sx, ...props }) => (
            <ListItem
              as={motion.div}
              layoutId={`clue-${clue.id}`}
              layout="position"
              sx={{
                ...sx,
                '--sticky-top': '3.5rem',
                '--sticky-bottom':
                  'calc(3.5rem + var(--selected-answer-height))',
              }}
              {...props}
            >
              <Text textAlign="right">{clue.id}</Text>
              <Text>{clue.clue}</Text>
              {children}
            </ListItem>
          )}
        </PickableList>
        <StickyHeading
          top="calc(3.5rem + var(--selected-clue-height))"
          bottom="calc(1rem + var(--selected-answer-height))"
        >
          Answers
        </StickyHeading>
        <PickableList
          items={puzzle.answers}
          selected={selectedAnswer}
          onSelect={setSelectedAnswer}
          onMeasure={setSelectedAnswerHeight}
        >
          {(answer, _i, { children, sx, ...props }) => (
            <ListItem
              as={motion.div}
              layoutId={`answer-${answer.id}`}
              layout="position"
              sx={{
                ...sx,
                '--sticky-top': 'calc(7rem + var(--selected-clue-height))',
                '--sticky-bottom': '1rem',
              }}
              {...props}
            >
              <Text textAlign="right">{answer.id}</Text>
              <Text>{answer.answer}</Text>
              {children}
            </ListItem>
          )}
        </PickableList>
        {revealing && selectedClue && selectedAnswer && (
          <Reveal
            clue={selectedClue}
            answer={selectedAnswer}
            onComplete={revealComplete}
          />
        )}
      </Container>
    </Stack>
  );
};

export default Puzzle;
