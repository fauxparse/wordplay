import { useColorMode } from '@chakra-ui/react';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Settings = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  hideCompleted: boolean;
  setHideCompleted: (hideCompleted: boolean) => void;
  blackAndWhite: boolean;
  setBlackAndWhite: (blackAndWhite: boolean) => void;
};

const SettingsContext = createContext<Settings>({} as Settings);

const STORAGE_KEY = 'wordplay.settings';

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { colorMode, setColorMode } = useColorMode();

  const setDarkMode = useCallback(
    (darkMode: boolean) => setColorMode(darkMode ? 'dark' : 'light'),
    [setColorMode],
  );

  const [hideCompleted, setHideCompleted] = useState(false);
  const [blackAndWhite, setBlackAndWhite] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return;

    const { hideCompleted = false, blackAndWhite = false } = JSON.parse(json);
    setHideCompleted(hideCompleted);
    setBlackAndWhite(blackAndWhite);
  }, []);

  const save = useCallback(
    (changes: Partial<Settings>) => {
      const settings = { hideCompleted, blackAndWhite, ...changes };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    },
    [hideCompleted, blackAndWhite],
  );

  const setHideCompletedAndSave = useCallback(
    (hideCompleted: boolean) => {
      setHideCompleted(hideCompleted);
      save({ hideCompleted });
    },
    [save],
  );

  const setBlackAndWhiteAndSave = useCallback(
    (blackAndWhite: boolean) => {
      setBlackAndWhite(blackAndWhite);
      save({ blackAndWhite });
    },
    [save],
  );

  return (
    <SettingsContext.Provider
      value={{
        darkMode: colorMode === 'dark',
        setDarkMode,
        hideCompleted,
        setHideCompleted: setHideCompletedAndSave,
        blackAndWhite,
        setBlackAndWhite: setBlackAndWhiteAndSave,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useSettings = () => useContext(SettingsContext);
