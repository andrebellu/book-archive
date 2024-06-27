/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {},
  plugins: [require('daisyui'),
    require('@tailwindcss/line-clamp'),
  ]
};