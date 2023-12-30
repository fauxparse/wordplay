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
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { Link, useRouterState } from '@tanstack/react-router';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    location: { pathname },
  } = useRouterState();

  return (
    <Box
      as="header"
      borderBottom="1px solid transparent"
      borderBottomColor="border.divider"
      position="sticky"
      top={0}
      bg="background.base"
      zIndex={20}
    >
      <Container
        display="grid"
        gridTemplateColumns="2rem 1fr auto"
        columnGap={4}
        py={2}
        alignItems="center"
      >
        <Box>
          {pathname > '/' && (
            <IconButton
              as={Link}
              to="/"
              variant="ghost"
              aria-label="Back"
              color="text.secondary"
              icon={<ArrowLeftIcon boxSize={6} />}
            />
          )}
        </Box>
        <Heading as="h1" size="md" m={0}>
          Wordplay quiz
        </Heading>
        <ButtonGroup spacing={0}>
          <IconButton
            variant="ghost"
            aria-label="Settings"
            color="text.secondary"
            icon={<SettingsIcon boxSize={6} />}
          />
          <IconButton
            variant="ghost"
            aria-label="Toggle dark mode"
            color="text.secondary"
            icon={
              colorMode === 'dark' ? (
                <SunIcon boxSize={6} />
              ) : (
                <MoonIcon boxSize={6} />
              )
            }
            onClick={toggleColorMode}
          />
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Header;
