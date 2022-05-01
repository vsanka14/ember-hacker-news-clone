const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.hbs'],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f6ef',
        grey: '#828282',
        'safety-orange': '#ff6600',
        'light-dark': '#efefef',
      },
      fontFamily: {
        mono: ['monospace', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
