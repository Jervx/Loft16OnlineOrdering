const windmill = require('@windmill/react-ui/config')

module.exports =  windmill({
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        blur : {
            xs : '1px'
        }
    },
  },
  variants: {
    extend: {
        
    },
  },
  plugins: [],
})
