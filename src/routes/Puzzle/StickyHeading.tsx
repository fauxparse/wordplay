import { Heading, HeadingProps } from '@chakra-ui/react';

const StickyHeading: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading
    size="lg"
    as="h2"
    position="sticky"
    pl={12}
    pt={2}
    pb={2}
    bg="background.base"
    zIndex={1}
    _before={{
      content: '""',
      position: 'absolute',
      bottom: '100%',
      left: 0,
      right: 0,
      height: '1.5rem',
      background:
        'linear-gradient(to top, var(--chakra-colors-background-base), rgba(255,255,255,0))',
      pointerEvents: 'none',
    }}
    _after={{
      content: '""',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      height: '1rem',
      background:
        'linear-gradient(to bottom, var(--chakra-colors-background-base), rgba(255,255,255,0))',
      pointerEvents: 'none',
    }}
    {...props}
  >
    {children}
  </Heading>
);

export default StickyHeading;
