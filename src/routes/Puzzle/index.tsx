import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  ListItem,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import { puzzleRoute } from '..';
import PickableList from './PickableList';
import Reveal from './Reveal';
import StickyHeading from './StickyHeading';
import { Answer, Clue } from './types';
import useSolution from './useSolution';
import { neutral, neutralDark } from '../../theme';
import { useSettings } from '../../SettingsProvider';
import Fireworks from './Fireworks';
import { useConfirmation } from '../../ConfirmationProvider';

const Puzzle: React.FC = () => {
  const { hideCompleted, blackAndWhite } = useSettings();

  const { puzzle } = puzzleRoute.useLoaderData();
  const container = useRef<HTMLDivElement>(null);

  const [selectedClueHeight, setSelectedClueHeight] = useState(0);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [selectedAnswerHeight, setSelectedAnswerHeight] = useState(0);

  const [revealing, setRevealing] = useState(false);

  const { loading, solution, match, solvedAnswers, solvedClues, clear } =
    useSolution(puzzle);

  useEffect(() => {
    if (selectedClue && selectedAnswer) {
      setRevealing(true);
    }
  }, [selectedClue, selectedAnswer]);

  const revealComplete = ({ clue, answer }: { clue: Clue; answer: Answer }) => {
    if (clue.answer === answer.id) {
      match(clue, answer);
    }
    setRevealing(false);
    setSelectedClue(null);
    setSelectedClueHeight(0);
    setSelectedAnswer(null);
    setSelectedAnswerHeight(0);
  };

  const black = useColorModeValue(neutral.neutral12, neutralDark.neutral12);
  const white = useColorModeValue(neutral.neutral1, neutralDark.neutral1);

  const highlight = blackAndWhite ? black : puzzle.color;

  const isDark = tinycolor(highlight).isDark();
  const contrast = isDark ? neutralDark.neutral1 : neutral.neutral12;

  const clues = useMemo(
    () =>
      hideCompleted
        ? puzzle.clues.filter((c: Clue) => !solvedClues.has(c))
        : puzzle.clues,
    [puzzle, hideCompleted, solvedClues],
  );

  const answers = useMemo(
    () =>
      hideCompleted
        ? puzzle.answers.filter((a: Answer) => !solvedAnswers.has(a))
        : puzzle.answers,
    [puzzle, hideCompleted, solvedAnswers],
  );

  const solved = useMemo(
    () => solution.size === puzzle.clues.length,
    [puzzle, solution],
  );

  const { confirm } = useConfirmation();

  const playAgain = () => {
    confirm({
      title: 'Start again?',
      children: <Text>This will clear all your progress for this puzzle.</Text>,
      confirm: 'Start again',
    }).then(clear);
  };

  return (
    <Stack
      as={motion.div}
      ref={container}
      pb={8}
      style={
        {
          '--header-height': 'calc(3.5rem + 1px)',
          '--progress-bar-height': '0.5rem',
          '--selected-clue-height': `${selectedClueHeight}px`,
          '--selected-answer-height': `${selectedAnswerHeight}px`,
          '--highlight-color': highlight,
          '--highlight-color-subtle': tinycolor
            .mix(highlight, white, 70)
            .toHexString(),
        } as CSSProperties
      }
      _after={{
        content: '""',
        pos: 'fixed',
        bg: 'linear-gradient(to bottom, transparent, var(--chakra-colors-background-base) 50%)',
        left: 0,
        right: 0,
        bottom: 0,
        h: 8,
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Container
        pos="sticky"
        top="var(--header-height)"
        zIndex={20}
        pl={16}
        bg="background.base"
      >
        <Progress
          max={puzzle.clues.length}
          value={solution.size}
          h="var(--progress-bar-height)"
          bg="background.subtle"
          sx={{
            '> div': {
              bg: 'var(--highlight-color)',
            },
          }}
        />
      </Container>
      <Container as="header" py={3} mt={40}>
        <Stack pl={12} gap={3}>
          <Text
            as="small"
            display="block"
            fontSize="lg"
            fontWeight="normal"
            color="text.secondary"
          >
            {puzzle.author || puzzle.year}
          </Text>
          <Heading as="h1" size="3xl" color="var(--highlight-color)">
            {puzzle.title}
          </Heading>
          <Text fontSize="lg">{puzzle.description}</Text>
        </Stack>
      </Container>
      <AnimatePresence mode="wait">
        {!loading &&
          (solved ? (
            <Container
              as={motion.div}
              key="solved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Stack
                ml={9}
                p={3}
                gap={3}
                rounded="md"
                bg="var(--highlight-color-subtle)"
                alignItems="start"
              >
                <Text>Congratulations! You’ve solved this puzzle.</Text>
                <Button
                  variant="solid"
                  bg="var(--highlight-color)"
                  _hover={{ bg: 'var(--highlight-color)' }}
                  _active={{ bg: 'var(--highlight-color)' }}
                  color={contrast}
                  onClick={playAgain}
                >
                  Play again
                </Button>
              </Stack>
              <Fireworks color={puzzle.color} />
            </Container>
          ) : (
            <Container
              as={motion.div}
              key="puzzle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              mt="3rem"
            >
              <StickyHeading
                top="calc(var(--header-height) + var(--progress-bar-height))"
                display="grid"
                gridTemplateColumns="1fr auto"
                alignItems="baseline"
              >
                <Text as="span">Clues</Text>
                <Text as="span">
                  <Text as="b">{solution.size}</Text>
                  <Text
                    as="small"
                    fontSize="100%"
                    fontWeight="normal"
                    color="text.secondary"
                  >
                    /{puzzle.clues.length}
                  </Text>
                </Text>
              </StickyHeading>
              <PickableList
                items={clues}
                selected={selectedClue}
                complete={solvedClues}
                onSelect={setSelectedClue}
                onMeasure={setSelectedClueHeight}
              >
                {(clue, _i, { children, sx, ...props }) => (
                  <ListItem
                    as={motion.div}
                    key={`${solution.has(clue) ? 'matched' : 'clue'}-${
                      clue.id
                    }`}
                    layoutId={`${solution.has(clue) ? 'matched' : 'clue'}-${
                      clue.id
                    }`}
                    layout="position"
                    sx={{
                      ...sx,
                      '--sticky-top':
                        'calc(var(--header-height) + 3rem + var(--progress-bar-height))',
                      '--sticky-bottom':
                        'calc(3.5rem + var(--selected-answer-height))',
                    }}
                    {...props}
                  >
                    <Text gridArea="text">{clue.clue}</Text>
                    {solution.has(clue) && (
                      <Box
                        gridRow={2}
                        gridColumn="2 / span 2"
                        color="text.secondary"
                      >
                        <Text color="text.primary">
                          {solution.get(clue)?.answer}
                        </Text>
                        {clue.description && (
                          <Text fontSize="sm">{clue.description}</Text>
                        )}
                        {clue.credit && (
                          <Text fontSize="sm">{clue.credit}</Text>
                        )}
                      </Box>
                    )}
                    {children}
                  </ListItem>
                )}
              </PickableList>
              <Divider my={4} />
              <StickyHeading
                top="calc(var(--header-height) + 3rem + var(--selected-clue-height) + var(--progress-bar-height))"
                bottom="calc(1rem + var(--selected-answer-height))"
              >
                Answers
              </StickyHeading>
              <PickableList
                items={answers}
                selected={selectedAnswer}
                complete={solvedAnswers}
                onSelect={setSelectedAnswer}
                onMeasure={setSelectedAnswerHeight}
              >
                {(answer, _i, { children, sx, ...props }) => (
                  <ListItem
                    as={motion.div}
                    key={`${solvedAnswers.has(answer) ? 'solved' : 'answer'}-${
                      answer.id
                    }`}
                    layoutId={`${
                      solvedAnswers.has(answer) ? 'solved' : 'answer'
                    }-${answer.id}`}
                    layout="position"
                    color={
                      solvedAnswers.has(answer)
                        ? 'text.disabled'
                        : 'text.primary'
                    }
                    sx={{
                      ...sx,
                      '--sticky-top':
                        'calc(var(--header-height) + 6rem + var(--selected-clue-height) + var(--progress-bar-height))',
                      '--sticky-bottom': '1rem',
                    }}
                    {...props}
                  >
                    <Text gridArea="text">{answer.answer}</Text>
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
          ))}
      </AnimatePresence>
    </Stack>
  );
};

export default Puzzle;
