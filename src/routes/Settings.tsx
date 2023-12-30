import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useSettings } from '../SettingsProvider';

type SettingsProps = Partial<DrawerProps> &
  Pick<DrawerProps, 'isOpen' | 'onClose'>;

const Settings: React.FC<SettingsProps> = (props) => {
  const {
    darkMode,
    setDarkMode,
    hideCompleted,
    setHideCompleted,
    blackAndWhite,
    setBlackAndWhite,
  } = useSettings();

  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent bg="background.base" color="text.primary">
        <DrawerCloseButton />
        <DrawerHeader>Settings</DrawerHeader>
        <DrawerBody>
          <Grid
            gridTemplateColumns="auto 1fr"
            rowGap={1}
            columnGap={6}
            alignItems="center"
          >
            <FormControl display="contents">
              <Switch
                gridColumn={1}
                isChecked={hideCompleted}
                onChange={(e) => setHideCompleted(e.currentTarget.checked)}
              />
              <FormLabel gridColumn={2} m={0}>
                <Text>Hide completed clues</Text>
              </FormLabel>
              <FormHelperText gridColumn={2} m={0} mb={4}>
                Makes your progress easy to see
              </FormHelperText>
            </FormControl>
            <FormControl display="contents">
              <Switch
                gridColumn={1}
                isChecked={blackAndWhite}
                onChange={(e) => setBlackAndWhite(e.currentTarget.checked)}
              />
              <FormLabel gridColumn={2} m={0}>
                <Text>Black and white</Text>
              </FormLabel>
              <FormHelperText gridColumn={2} m={0} mb={4}>
                More legible, but less fun
              </FormHelperText>
            </FormControl>
            <FormControl display="contents">
              <Switch
                gridColumn={1}
                isChecked={darkMode}
                onChange={(e) => setDarkMode(e.currentTarget.checked)}
              />
              <FormLabel gridColumn={2} m={0}>
                <Text>Dark mode</Text>
              </FormLabel>
            </FormControl>
          </Grid>
          <Divider my={6} />
          <Stack spacing={3}>
            <Text>
              Puzzles by{' '}
              <Link
                href="http://jimfishwick.com/"
                target="_blank"
                rel="noopener"
                fontWeight="bold"
              >
                Jim Fishwick
              </Link>{' '}
              and friends.
            </Text>
            <Text>
              Code by{' '}
              <Link
                href="http://fauxpar.se/"
                target="_blank"
                rel="noopener"
                fontWeight="bold"
              >
                Matt Powell
              </Link>{' '}
              (one of the friends).
            </Text>
            <Text>Colors from the Pantone “Color of the Year” collection.</Text>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
