const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

function basis({ addUtilities }) {
  const Basis = {
    '.basis-10': {
      flexBasis: '10%',
    },
  };
  addUtilities(Basis);
}
/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        error: {
          lightest: '#FDEDED',
          light: '#FADBDB',
          medium: '#F3A5A5',
          base: '#EE8181',
          dark: defaultTheme.colors.red[600],
          darkest: '#B41818',
        },
        gray: {
          lightest: '#F2F2F3',
          light: '#ececec',
          medium: '#8D8B92',
          base: '#646369',
          dark: '#4b4a4f',
          darkest: '#323135',
        },
        primary: {
          lightest: '#e6f0ff',
          light: '#ADB7FF',
          medium: '#8593FF',
          base: '#3385FF',
          dark: '#0066ff',
          darkest: '#005AE0',
        },
        secondary: {
          lightest: '#EBEDFF',
          base: '#5C6FFF',
          dark: '#475DFF',
          darkest: '#1F39FF',
        },
        success: {
          lightest: '#F0FAF0',
          light: '#D1F0D1',
          medium: '#97DB95',
          base: '#6ACB67',
          dark: '#42B63E',
          darkest: '#379834',
        },
        $text: {
          prim: '#2c3e50',
          secon: '#666666',
        },
        warning: {
          lightest: '#FEF7EB',
          light: '#FDE8C4',
          medium: '#F8BA4F',
          base: '#F8BA4F',
          dark: '#F49F0A',
          darkest: '#D78C09',
        },
        $white: '#ffffff',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fill: (theme) => theme('colors'),
      lineHeight: (theme) => theme('spacing'),
      minWidth: {
        movil: '32rem',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      width: {
        content: 'fit-content',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fill: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fontSize: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    margin: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [
    plugin(basis),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
    ],
  },
};
