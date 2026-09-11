/**
 * Paleta de marca de MesaYa, calcada 1:1 de `mesaYa/src/index.css` (mismos
 * tokens que `tailwind.config.js`) para que las pantallas que todavía usan
 * `ThemedView`/`ThemedText` en vez de clases de Tailwind se vean igual.
 * Cualquier color nuevo se agrega primero en el proyecto web, nunca acá.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2a1520', // foreground
    background: '#fdf6f4',
    backgroundElement: '#ffded8', // muted
    backgroundSelected: '#f0d5dc', // border
    textSecondary: '#6b4a5c', // muted-foreground
  },
  dark: {
    text: '#f5e9ee',
    background: '#171014',
    backgroundElement: '#2c1f2e',
    backgroundSelected: '#3a2a38',
    textSecondary: '#c0a8b4',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
