import { Container, ListItem, OrderedList, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import PUZZLES from '../puzzles.yml';
import { useMemo } from 'react';
import { orderBy } from 'lodash-es';

const Root: React.FC = () => {
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

  return (
    <Container>
      <OrderedList as="div" m={0} px={0} py={3}>
        {orderBy(Object.values(PUZZLES), 'year', 'desc').map((puzzle) => (
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
              {puzzle.year}
            </Text>
            <Text
              as="span"
              gridArea="topic"
              fontSize="3xl"
              fontWeight="bold"
              color={puzzle.color}
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
    </Container>
  );
};

export default Root;
