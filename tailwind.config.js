/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    data: {
      active: 'active=true',
    },
    extend: {
      container: {
        center: true,
        padding: '5vw',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif, system-ui, -apple-system, sans-serif',
        ],
      },
      gridTemplateColumns: {
        figma: 'repeat(11, 1fr 2vw) 1fr',
      },
      gridColumnStart: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
      },
      gridColumnEnd: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
      },
      colors: {
        accent: 'rgb(var(--accent-color))',
        path: 'rgb(var(--path-color))',
        ajs: '#FFF200',
        body: '#3E474E',
      },
      opacity: {
        3: '.03',
        12: '.12',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
