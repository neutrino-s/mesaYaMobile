/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Paleta de marca de MesaYa, calcada 1:1 de `mesaYa/src/index.css`
      // (a su vez tomada del panel Flutter). Cualquier color nuevo se agrega
      // ahí primero y se replica acá, nunca al revés.
      colors: {
        background: '#fdf6f4',
        foreground: '#2a1520',
        card: '#ffffff',
        'card-foreground': '#2a1520',
        primary: '#7f3065',
        'primary-foreground': '#ffffff',
        secondary: '#ffded8',
        'secondary-foreground': '#2a1520',
        muted: '#ffded8',
        'muted-foreground': '#6b4a5c',
        accent: '#dc3148',
        'accent-foreground': '#ffffff',
        destructive: '#dc3148',
        'destructive-foreground': '#ffffff',
        border: '#f0d5dc',
        input: '#f0d5dc',
        ring: '#7f3065',

        'brand-crimson': '#dc3148',
        'brand-plum': '#7f3065',
        'brand-lavender': '#ab8fc0',
        'brand-pink': '#edacc4',
        'brand-blush': '#ffded8',

        'auth-canvas': '#fdefeb',
        'auth-field-fill': '#fef8f6',
        'auth-field-border': '#f3dcd5',
        'auth-gradient-start': '#8a3468',
        'auth-gradient-end': '#48102c',
      },
      fontFamily: {
        sans: ['Figtree_400Regular'],
        heading: ['Caprasimo_400Regular'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      // Tailwind v4 (usado en mesaYa web) trae una escala de spacing más
      // granular por defecto; acá en v3 se agrega a mano el valor puntual
      // que usan los componentes de referencia (inputs/botones de h-13).
      spacing: {
        13: '3.25rem',
      },
    },
  },
  plugins: [],
}
