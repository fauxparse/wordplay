import { extendTheme } from '@chakra-ui/react';

const neutral = {
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

const neutralDark = {
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
});
