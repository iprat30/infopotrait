/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#111111',
          50: '#F7F7F7',
          100: '#EAEAEA',
          200: '#D5D5D5',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
        warm: {
          50: '#FAF8F5',
          100: '#F5EFE6',
          200: '#EBDDCF',
          300: '#DEC9B4',
          500: '#B89B7E',
          800: '#67523E',
        },
        wa: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
          light: '#E8F8EE',
          dark: '#075E54',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'floating': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
