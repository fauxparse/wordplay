import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

type ConfirmationOptions = {
  title?: string;
  children: ReactNode;
  confirm?: string;
  cancel?: string;
  dangerous?: boolean;
};

type ContextShape = {
  confirm: (options: ConfirmationOptions) => Promise<void>;
};

const ConfirmationContext = createContext<ContextShape>({
  confirm: () => Promise.resolve(),
});

const ConfirmationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [options, setOptions] = useState<ConfirmationOptions>({
    children: null,
  });

  const resolveRef = useRef<() => void>(() => void 0);

  const confirm = useCallback(
    (options: ConfirmationOptions) =>
      new Promise<void>((resolve) => {
        setOptions(options);
        onOpen();
        resolveRef.current = resolve;
      }),
    [onOpen],
  );

  const confirmClicked = () => {
    resolveRef.current();
    onClose();
  };

  const cancelClicked = () => {
    onClose();
  };

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {options.title && (
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {options.title}
              </AlertDialogHeader>
            )}

            <AlertDialogBody>{options.children}</AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup spacing={3}>
                <Button ref={cancelRef} variant="ghost" onClick={cancelClicked}>
                  {options.cancel || 'Cancel'}
                </Button>
                <Button
                  colorScheme={options.dangerous ? 'red' : undefined}
                  onClick={confirmClicked}
                >
                  {options.confirm || 'OK'}
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationProvider;

export const useConfirmation = () => useContext(ConfirmationContext);
