/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      popins:['Poppins', 'serif'],
    },
    extend: {
      colors:{
        'bg':'#1F4529',
        'txt':'#EED3B1',
        'btn' : '#47663B',
      },
    },
  },
  plugins: [],
}

