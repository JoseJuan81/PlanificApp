const defaultTheme = require('tailwindcss/defaultTheme');
// const plugin = require('tailwindcss/plugin');
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
        $black: '#000000',
        error: defaultTheme.colors.red[600],
        $primaryGray: '#ececec',
        $primaryTextGray: '#222222',
        $secondaryGray: '#f5f5f5',
        $secondaryTextGray: '#666666',
        $white: '#ffffff',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      lineHeight: (theme) => theme('spacing'),
      minWidth: {
        movil: '32rem',
      },
      width: {
        content: 'fit-content',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    margin: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fontSize: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
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
