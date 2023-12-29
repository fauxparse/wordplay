import { Container, Heading, ListItem, Stack, Text } from '@chakra-ui/react';
import { CSSProperties, useRef, useState } from 'react';
import PickableList from './PickableList';
import StickyHeading from './StickyHeading';
import { puzzleRoute } from '..';

export type Puzzle = {
  year: string;
  title: string;
  description: string;
  clues: Clue[];
  answers: Answer[];
};

type Clue = {
  clue: string;
  answer: number;
  description?: string;
  credit?: string;
};

type Answer = string;

const Puzzle: React.FC = () => {
  const { puzzle } = puzzleRoute.useLoaderData();
  const container = useRef<HTMLDivElement>(null);

  const [selectedClueHeight, setSelectedClueHeight] = useState(0);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [selectedAnswerHeight, setSelectedAnswerHeight] = useState(0);

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
          {(clue, i, { children, ...props }) => (
            <ListItem
              sx={{
                "&[aria-selected='true']": {
                  position: 'sticky',
                  zIndex: 1,
                  top: '3.5rem',
                  bottom: 'calc(3.5rem + var(--selected-answer-height))',
                  bg: 'background.panel',
                  borderColor: 'border.selected',
                },
              }}
              {...props}
            >
              <Text textAlign="right">{i + 1}</Text>
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
          {(answer, i, { children, ...props }) => (
            <ListItem
              sx={{
                "&[aria-selected='true']": {
                  position: 'sticky',
                  zIndex: 1,
                  top: 'calc(7rem + var(--selected-clue-height))',
                  bottom: '1rem',
                  bg: 'background.panel',
                  borderColor: 'border.selected',
                },
              }}
              {...props}
            >
              <Text textAlign="right">{i + 1}</Text>
              <Text>{answer}</Text>
              {children}
            </ListItem>
          )}
        </PickableList>
      </Container>
    </Stack>
  );
};

export default Puzzle;
