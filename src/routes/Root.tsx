import {
  Container,
  Heading,
  ListItem,
  OrderedList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import PUZZLES from '../puzzles.yml';
import { Fragment, useMemo, useRef } from 'react';
import { orderBy, partition } from 'lodash-es';
import { useSettings } from '../SettingsProvider';
import { neutral, neutralDark } from '../theme';
import { motion } from 'framer-motion';

const Root: React.FC = () => {
  const { blackAndWhite } = useSettings();

  const black = useColorModeValue(neutral.neutral12, neutralDark.neutral12);

  const scores = useMemo<{
    [k in keyof typeof PUZZLES]: { found: number; total: number };
  }>(
    () =>
      Object.values(PUZZLES).reduce((acc, puzzle) => {
        const solution = JSON.parse(
          localStorage.getItem(`wordplay.${puzzle.year}`) || '{}',
        );
        const found = Object.values(solution).length;
        const total = puzzle.clues.length;
        return Object.assign(acc, { [puzzle.year]: { found, total } });
      }, {}),
    [],
  );

  const container = useRef<HTMLDivElement>(null);

  const [regular, guest] = useMemo(() => {
    const [guest, regular] = partition(Object.values(PUZZLES), 'guest');
    return [orderBy(regular, 'year', 'desc'), guest];
  }, []);

  return (
    <Container
      as={motion.div}
      ref={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[regular, guest].map((puzzles, i) => (
        <Fragment key={i ? 'guest' : 'regular'}>
          {i > 0 && (
            <Heading
              as="h2"
              fontSize="lg"
              mt={8}
              ml={12}
              color="text.secondary"
            >
              Guest puzzles
            </Heading>
          )}
          <OrderedList as="div" m={0} px={0} py={3}>
            {puzzles.map((puzzle) => (
              <ListItem
                as={Link}
                to={puzzle.year}
                key={puzzle.year}
                display="grid"
                gridTemplate={`"year blank" auto "topic progress" auto / 1fr auto`}
                padding={0}
                margin={0}
                pl={12}
                py={2}
                rowGap={0}
                columnGap={3}
                alignItems="baseline"
              >
                <Text as="span" gridArea="year" color="text.secondary">
                  {puzzle.author || puzzle.year}
                </Text>
                <Text
                  as="span"
                  gridArea="topic"
                  fontSize="3xl"
                  fontWeight="bold"
                  color={blackAndWhite ? black : puzzle.color}
                >
                  {puzzle.title}
                </Text>
                <Text
                  as="span"
                  gridArea="progress"
                  color="text.secondary"
                  fontSize="2xl"
                >
                  {`${scores[puzzle.year].found}/${scores[puzzle.year].total}`}
                </Text>
              </ListItem>
            ))}
          </OrderedList>
        </Fragment>
      ))}
    </Container>
  );
};

export default Root;
