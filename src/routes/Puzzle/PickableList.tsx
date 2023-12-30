import {
  Box,
  IconButton,
  ListItemProps,
  ListProps,
  OrderedList,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon';
import { Answer, Clue } from './types';

type PickableListProps<T> = Omit<ListProps, 'children' | 'onSelect'> & {
  items: T[];
  selected: T | null;
  complete: Set<T>;
  children: (item: T, index: number, props: ListItemProps) => React.ReactNode;
  onSelect: (item: T | null) => void;
  onMeasure?: (height: number) => void;
};

const PickableList = <T extends Clue | Answer>({
  items,
  selected,
  complete,
  children,
  onSelect,
  onMeasure,
  ...props
}: PickableListProps<T>) => {
  const container = useRef<HTMLElement>(null);

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null,
  );

  const select = (index: number | null) => {
    if (index === null) {
      setSelectedElement(null);
      onSelect(null);
      return;
    }

    const element: HTMLElement | null =
      container.current?.querySelector(`[data-index="${index}"]`) ?? null;
    setSelectedElement(element);
    onSelect(items[index]);
  };

  useEffect(() => {
    if (!onMeasure) return;

    if (!selectedElement) {
      onMeasure(0);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const height = (entries[0].target as HTMLElement).offsetHeight;
      onMeasure(height);
    });
    observer.observe(selectedElement);
    onMeasure(selectedElement.offsetHeight);

    return () => observer.disconnect();
  }, [selectedElement, onMeasure]);

  return (
    <OrderedList ref={container} as="div" display="contents" {...props}>
      {items.map((item, index) =>
        children(item, index, {
          display: 'grid',
          gridTemplate: `"number text gap actions" auto / 2rem auto 1fr 1.5rem`,
          alignItems: 'start',
          columnGap: 4,
          py: 1,
          pr: 1,
          border: '1px solid transparent',
          rounded: 'md',
          cursor: complete.has(item) ? undefined : 'pointer',
          'aria-selected': item === selected,
          'data-index': index,
          color: complete.has(item) ? 'text.disabled' : 'text.primary',
          sx: {
            "&[aria-selected='true']": {
              position: 'sticky',
              zIndex: 2,
              top: 'var(--sticky-top)',
              bottom: 'var(--sticky-bottom)',
              bg: 'var(--highlight-color-subtle)',
              borderColor: 'var(--highlight-color)',
              boxShadow: '0 0 1rem 0.5rem var(--chakra-colors-background-base)',
            },
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          onClick: complete.has(item) ? undefined : () => select(index),
          children: (
            <>
              <Text textAlign="right" gridArea="number">
                {item.id}
              </Text>
              {selected === item && (
                <IconButton
                  gridArea="actions"
                  variant="ghost"
                  p={0}
                  h={6}
                  w={6}
                  minW={0}
                  aria-label="Cancel"
                  icon={<CloseIcon boxSize={4} />}
                  onClick={(e) => {
                    select(null);
                    e.stopPropagation();
                  }}
                />
              )}
              {complete.has(item) && (
                <Box
                  as={motion.span}
                  gridRow={1}
                  gridColumn={2}
                  bg="var(--chakra-colors-text-secondary)"
                  h="1px"
                  mt="0.85em"
                  mx="-0.25em"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                  transformOrigin="0% 50%"
                />
              )}
            </>
          ),
        } as ListItemProps),
      )}
    </OrderedList>
  );
};

export default PickableList;
