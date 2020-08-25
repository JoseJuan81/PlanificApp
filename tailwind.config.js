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
        $dark: {
          prim: defaultTheme.colors.blue[900],
        },
        $error: defaultTheme.colors.red[600],
        primary: {
          light: '#f5f9ff',
          base: '#408fff',
        },
        $secondary: '#5856d6',
        gray: {
          light: '#fafafa',
          medium: '#f5f5f5',
          base: '#ececec',
        },
        $success: '',
        $text: {
          prim: '#2c3e50',
          secon: '#666666',
        },
        $warning: '#ffbe3d',
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
