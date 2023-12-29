import {
  IconButton,
  ListItemProps,
  ListProps,
  OrderedList,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon';

type PickableListProps<T> = Omit<ListProps, 'children' | 'onSelect'> & {
  items: T[];
  selected: T | null;
  children: (item: T, index: number, props: ListItemProps) => React.ReactNode;
  onSelect: (item: T | null) => void;
  onMeasure?: (height: number) => void;
};

const PickableList = <T,>({
  items,
  selected,
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
          key: index,
          display: 'grid',
          gridTemplateColumns: '2rem 1fr auto',
          gap: 4,
          py: 1,
          pr: 1,
          border: '1px solid transparent',
          rounded: 'md',
          cursor: 'pointer',
          'aria-selected': item === selected,
          'data-index': index,
          sx: {
            "&[aria-selected='true']": {
              position: 'sticky',
              zIndex: 1,
              top: 'var(--sticky-top)',
              bottom: 'var(--sticky-bottom)',
              bg: 'background.panel',
              borderColor: 'border.selected',
            },
          },
          onClick: () => select(index),
          children: (
            <>
              {selected === item && (
                <IconButton
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
            </>
          ),
        } as ListItemProps),
      )}
    </OrderedList>
  );
};

export default PickableList;
