import {
  Box,
  ButtonGroup,
  Container,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import SettingsIcon from '../icons/SettingsIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import Settings from './Settings';

const Header = () => {
  const {
    location: { pathname },
  } = useRouterState();

  const [showSettings, setShowSettings] = useState(false);

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
            onClick={() => setShowSettings(true)}
          />
        </ButtonGroup>
      </Container>
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </Box>
  );
};

export default Header;
