const brandLight = '#EADDC7';

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: '#C5A265',
        brandLight,
        brandDark: '#AF9362',
        lighter: '#FFFDFA',
        light: '#F1ECE5',
        darkGray: '#333',
        lightGray: '#555',
        lighterGray: '#777',
        disabled: '#D2D2D2',
        disabledText: '#9F9F9F',
        brandError: '#F56B63',
      },
      borderColor: {
        DEFAULT: brandLight,
      },
      backgroundImage: {
        'split-white-light-left':
          'linear-gradient(to left, #F1ECE5 70% , white 30%);',
        'split-white-light-bottom':
          'linear-gradient(to bottom, #F1ECE5 70% , white 30%);',
        'split-white-light-left-60':
          'linear-gradient(to left, white 60% , #F1ECE5 40%)',
        'split-white-light-left-40':
          'linear-gradient(to left, white 40% , #F1ECE5 40%)',
      },
    },
  },
  plugins: [],
};
