import { extendTheme } from '@chakra-ui/react';
import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const neutral = {
  neutral1: '#fcfcfd',
  neutral2: '#f9f9fb',
  neutral3: '#f0f0f3',
  neutral4: '#e8e8ec',
  neutral5: '#e0e1e6',
  neutral6: '#d9d9e0',
  neutral7: '#cdced6',
  neutral8: '#b9bbc6',
  neutral9: '#8b8d98',
  neutral10: '#80838d',
  neutral11: '#60646c',
  neutral12: '#1c2024',
};

export const neutralDark = {
  neutral1: '#111113',
  neutral2: '#18191b',
  neutral3: '#212225',
  neutral4: '#272a2d',
  neutral5: '#2e3135',
  neutral6: '#363a3f',
  neutral7: '#43484e',
  neutral8: '#5a6169',
  neutral9: '#696e77',
  neutral10: '#777b84',
  neutral11: '#b0b4ba',
  neutral12: '#edeef0',
};

const crimson = {
  crimson1: '#fffcfd',
  crimson2: '#fef7f9',
  crimson3: '#ffe9f0',
  crimson4: '#fedce7',
  crimson5: '#facedd',
  crimson6: '#f3bed1',
  crimson7: '#eaacc3',
  crimson8: '#e093b2',
  crimson9: '#e93d82',
  crimson10: '#df3478',
  crimson11: '#cb1d63',
  crimson12: '#621639',
};

const crimsonDark = {
  crimson1: '#191114',
  crimson2: '#201318',
  crimson3: '#381525',
  crimson4: '#4d122f',
  crimson5: '#5c1839',
  crimson6: '#6d2545',
  crimson7: '#873356',
  crimson8: '#b0436e',
  crimson9: '#e93d82',
  crimson10: '#ee518a',
  crimson11: '#ff92ad',
  crimson12: '#fdd3e8',
};

const {
  definePartsStyle: defineSwitchParts,
  defineMultiStyleConfig: defineSwitchConfig,
} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const switchStyle = defineSwitchParts({
  thumb: {
    bg: 'neutral.1',
  },
  track: {
    bg: 'neutral.3',
    _checked: {
      bg: 'crimson.5',
    },
  },
});

const switchTheme = defineSwitchConfig({
  baseStyle: switchStyle,
});

const makePalette = <C extends string, K extends `${C}${number}`>(
  light: Record<K, string>,
  dark: Record<K, string>,
): Record<`${number}`, string> =>
  Object.keys(light).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key.replace(/^[^\d]+/, '')]: {
          default: light[key as K],
          _dark: dark[key as K],
        },
      }),
    {},
  );

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: 'background.base',
        color: 'text.primary',
      },
    },
  },
  semanticTokens: {
    colors: {
      neutral: makePalette(neutral, neutralDark),
      crimson: makePalette(crimson, crimsonDark),
      background: {
        base: {
          default: neutral.neutral1,
          _dark: neutralDark.neutral1,
        },
        panel: {
          default: neutral.neutral5,
          _dark: neutralDark.neutral5,
        },
        subtle: {
          default: neutral.neutral3,
          _dark: neutralDark.neutral3,
        },
      },
      border: {
        divider: {
          default: neutral.neutral6,
          _dark: neutralDark.neutral6,
        },
        selected: {
          default: neutral.neutral8,
          _dark: neutralDark.neutral8,
        },
      },
      text: {
        primary: {
          default: neutral.neutral12,
          _dark: neutralDark.neutral12,
        },
        secondary: {
          default: neutral.neutral11,
          _dark: neutralDark.neutral11,
        },
        disabled: {
          default: neutral.neutral8,
          _dark: neutralDark.neutral8,
        },
      },
    },
  },
  components: {
    Switch: switchTheme,
  },
});
