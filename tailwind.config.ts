// -------------------------------------------------------------------------- //
//-                              TAILWIND CONFIG                             -//
// -------------------------------------------------------------------------- //
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
/* -------------------------------------------------------------------------- */

const config: TailwindConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: ({ theme }) => ({
        loading: {
          '0%': {
            opacity: '.2',
          },
          '20%': {
            opacity: '1',
            transform: 'translateX(1px)',
          },
          to: {
            opacity: '.2',
          },
        },
        'cp-rotate': {
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'cp-dash': {
          '0%': {
            strokeDasharray: '1, 200',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-35',
          },
          '100%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-124',
          },
        },
        'cp-color': {
          '0%': {
            stroke: theme('colors.primary'),
          },
          '40%': {
            stroke: theme('colors.primary'),
          },
          '66%': {
            stroke: theme('colors.primary'),
          },
          '80%, 90%': {
            stroke: theme('colors.primary'),
          },
        },
        'fade-in-out': {
          '0%': {
            opacity: '100%',
          },
          '50%': {
            opacity: '15%',
          },
          '100%': {
            opacity: '100%',
          },
        },
      }),
      backgroundSize: {
        '190%': '190%',
      },
      colors(utils) {
        return {
          ...Theme.palettes(),
        };
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',

      'sm+': { raw: '(min-width: 641px)' },
      'md+': { raw: '(min-width: 769px)' },
      'lg+': { raw: '(min-width: 1025px)' },
      'xl+': { raw: '(min-width: 1281px)' },
      '2xl+': { raw: '(min-width: 1537px)' },

      'sm-': { raw: '(max-width: 640px)' },
      'md-': { raw: '(max-width: 768px)' },
      'lg-': { raw: '(max-width: 1024px)' },
      'xl-': { raw: '(max-width: 1280px)' },
      '2xl-': { raw: '(max-width: 1536px)' },

      short: { raw: '(min-width: 1280px) and (max-height: 810px)' },
      hMd: { raw: '(min-height: 800px)' },
      hLg: { raw: '(min-height: 900px)' },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/container-queries'),
    plugin(
      ({ addBase, matchUtilities, theme, addVariant, addUtilities, addComponents, e, config }) => {
        // - Variants
        addVariant('enter', ['&:focus', '&:focus-within', '&:focus-visible']);
        addVariant('hocus', ['&:focus', '&:focus-within', '&:focus-visible', '&:hover']);
        // - Components
        addComponents({
          '.no-ring': {
            outline: 'unset',
            border: 'unset',
            boxShadow: 'unset',
          },
          '.no-ring-tw': {
            '--tw-ring-inset': 'null',
            '--tw-ring-offset-width': 'null',
            '--tw-ring-offset-color': 'null',
            '--tw-ring-color': 'null',
            '--tw-ring-offset-shadow': 'null',
            '--tw-ring-shadow':
              'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            outline: 'unset',
            borderColor: 'hsl(var(--bc) / var(--tw-border-opacity));',
          },
          '.hStack': {
            display: 'flex',
            flexDirection: 'row',
          },
          '.vStack': {
            display: 'flex',
            flexDirection: 'column',
          },
          '.scroller': {
            scrollbarWidth: 'thin',
            scrollbarColor: `#ec4899 transparent`,
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ec4899',
              borderRadius: '5px',
            },
          },
          '.t0': { top: '0' },
          '.r0': { right: '0' },
          '.b0': { bottom: '0' },
          '.l0': { left: '0' },
          '.flex-center': {
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.shadow-low': {
            boxShadow: 'var(--shadow-elevation-low)',
          },
          '.shadow-mid': {
            boxShadow: 'var(--shadow-elevation-medium)',
          },
          '.shadow-high': {
            boxShadow: 'var(--shadow-elevation-high)',
          },
        });
        // - Match Utilities
        matchUtilities(
          {
            'sec-name': (v) => ({
              position: 'relative',
              paddingTop: '40px',
              '&::before': {
                content: v,
                position: 'absolute',
                top: '0',
                left: '0',
                padding: '1ch',
                textDecoration: 'underline',
                textUnderlineOffset: '0.3ch',
                fontStyle: 'italic',
                color: theme('colors.base.light'),
                '--tw-content': 'inherit',
              },
            }),
          },
          { values: theme('content') }
        );
        matchUtilities({ wh: (v) => ({ width: v, height: v }) }, { values: theme('width') });
      }
    ),
  ],
  daisyui: {
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    darkTheme: 'dark',
    styled: true,
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#ec4899',
          'primary-focus': '#f871b5',
          secondary: '#6072c5',
          'secondary-focus': '#7c8ed9',
          accent: '#57b2ce',
          'accent-focus': '#67d3f4',
          'base-100': '#2D3748',
        },
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */

// -------------------------------------------------------------------------- //
//-                                  COLORS                                  -//
// -------------------------------------------------------------------------- //
const Theme = obj({
  config: {
    paletteNames: [
      'primary',
      'secondary',
      'accent',
      'base',
      'background',
      'paper',
      'info',
      'success',
      'warning',
      'error',
      'text',
    ],
    colorTypes: ['main', 'dark', 'light', 'content', 'focus'],
  },
  palettes() {
    function objectToCssVariablePath(obj: NestedObject, path = '') {
      let result: NestedObject = {};

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = objectToCssVariablePath(obj[key] as NestedObject, `${path}-${key}`);
          } else {
            let variablePath = `${path}-${key}`.replace(/^-/, '');
            result[key] = `var(--${variablePath})`;
          }
        }
      }

      return result;
    }

    return objectToCssVariablePath(
      {
        ...this.config.paletteNames.reduce<NestedObject>((acc, palette) => {
          acc[palette] = Theme.config.colorTypes.reduce<NestedObject>((acc, type) => {
            acc[type] = '';
            return acc;
          }, {});
          return acc;
        }, {}),
      },
      'color'
    );
  },
});





// --------------------------------- Helpers -------------------------------- //
function obj<const T>(obj: { [K in keyof T]: T[K] & ThisType<T> }) {
  return obj as T;
}

// ---------------------------------- Types --------------------------------- //
type TailwindConfig = Config & DaisyUIConfig;
type DaisyUIConfig = {
  daisyui?: {
    styled?: boolean; // default true
    themes?: DaisyUITheme; // default true
    base?: boolean; // default true
    utils?: boolean; // default true
    logs?: boolean; // default true
    rtl?: boolean; // default false
    prefix?: string; // default ""
    darkTheme?: 'dark' | 'light'; // default 'dark'
  };
};
type DaisyUIColors = Record<string, string> & {
  primary: string;
  'primary-focus'?: string;
  'primary-content'?: string;
  secondary: string;
  'secondary-focus'?: string;
  'secondary-content'?: string;
  accent: string;
  'accent-focus'?: string;
  'accent-content'?: string;
  neutral: string;
  'neutral-focus'?: string;
  'neutral-content'?: string;
  'base-100': string;
  'base-200'?: string;
  'base-300'?: string;
  'base-content'?: string;
  info?: string;
  'info-content'?: string;
  success?: string;
  'success-content'?: string;
  warning?: string;
  'warning-content'?: string;
  error?: string;
  'error-content'?: string;
};
type DaisyUITheme =
  | boolean
  | string[]
  | Record<string, DaisyUIColors>[]
  | [string | Record<string, DaisyUIColors>];
type NestedObject = {
  [key: string]: string | NestedObject;
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
export default config;
/* -------------------------------------------------------------------------- */