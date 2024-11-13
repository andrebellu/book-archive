/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        aby: ['Abyssinica SIL', "serif"],
      },
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary": "#6ee7b7",
                      
            "secondary": "#bbf7d0",
                      
            "accent": "#0369a1",
                      
            "neutral": "#120411",
                      
            "base-100": "#052900",
                      
            "info": "#0369a1",
                      
            "success": "#008200",
                      
            "warning": "#f59e0b",
                      
            "error": "#7f1d1d",
          },
        },
      ],
    },
  plugins: [require('daisyui'),
    require('@tailwindcss/line-clamp'),
  ]
};