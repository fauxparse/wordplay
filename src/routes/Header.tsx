import {
  Box,
  ButtonGroup,
  Container,
  Heading,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import SettingsIcon from '../icons/SettingsIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      borderBottom="1px solid transparent"
      borderBottomColor="border.divider"
    >
      <Container
        display="grid"
        gridTemplateColumns="2rem 1fr auto"
        columnGap={4}
        py={2}
        alignItems="center"
      >
        <Box />
        <Heading as="h1" size="md" m={0}>
          Wordplay quiz
        </Heading>
        <ButtonGroup spacing={0}>
          <IconButton
            variant="ghost"
            aria-label="Settings"
            icon={<SettingsIcon />}
          />
          <IconButton
            variant="ghost"
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Header;
