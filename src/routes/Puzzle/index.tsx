import { LoaderFunction, useLoaderData } from 'react-router-dom';
import PUZZLES from '../../puzzles.yml';
import {
  Container,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { CSSProperties, useRef, useState } from 'react';
import PickableList from './PickableList';
import StickyHeading from './StickyHeading';
import CloseIcon from '../../icons/CloseIcon';

type Puzzle = {
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

export const loader: LoaderFunction<{ year: string }> = async ({
  params: { year },
}): Promise<Puzzle> => {
  const data = (year && PUZZLES[year]) || null;
  if (!data) throw 'Not found';
  return data;
};

const Puzzle: React.FC = () => {
  const puzzle = useLoaderData() as Puzzle;

  const container = useRef<HTMLDivElement>(null);

  const [selectedClueHeight, setSelectedClueHeight] = useState(0);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [selectedAnswerHeight, setSelectedAnswerHeight] = useState(0);

  const { toggleColorMode } = useColorMode();

  console.log(selectedClueHeight);

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
          bottom="var(--selected-answer-height)"
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
                  top: 'calc(7rem + var(--selected-clue-height))',
                  bottom: 0,
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
