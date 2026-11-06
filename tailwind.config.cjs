module.exports = {
  content: ['./dist/index.html', './dist/convite.js'],
  theme: {
    extend: {
      colors: {
        alabaster: '#F7F5F0',
        linen: '#EFECE6',
        stonewarm: '#E5E0D5',
        olive: {
          light: '#E4E7DE',
          muted: '#626D53',
          DEFAULT: '#4A553B',
          dark: '#2F3725',
          deep: '#1C1E1A'
        },
        ralph: {
          tan: '#9C7A54',
          camel: '#C8B6A0',
          navy: '#1B2432'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '0.15em',
        widest: '0.28em'
      }
    }
  }
};
