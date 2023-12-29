import { ListItem, OrderedList } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import PUZZLES from '../puzzles.yml';

const Root: React.FC = () => (
  <OrderedList>
    {Object.values(PUZZLES).map((puzzle) => (
      <ListItem key={puzzle.year}>
        <Link to={puzzle.year}>
          <small>{puzzle.year}</small> {puzzle.title}
        </Link>
      </ListItem>
    ))}
  </OrderedList>
);

export default Root;
