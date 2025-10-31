module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f172a'
      },
      screens: {
        'xs': {'min': '320px',
          'max':'480px'
        }
    }
    }
  },
  plugins: []
}