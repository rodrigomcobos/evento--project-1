/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'image-1': "url('/src/assets/slides/slide-1.png')",
        'image-2': "url('/src/assets/slides/slide-2.png')",
        'image-3': "url('/src/assets/slides/slide-3.png')",
        'image-4': "url('/src/assets/slides/slide-4.png')",
        'image-5': "url('/src/assets/slides/slide-5.png')",
        'background-img': 'url("/src/assets/slides/shadedbackground.png")",',
      },
    },
  },
  plugins: [],
};
