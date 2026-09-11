import { Caprasimo_400Regular } from '@expo-google-fonts/caprasimo';
import { Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold } from '@expo-google-fonts/figtree';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';

import '@/global.css';

SplashScreen.preventAutoHideAsync();

// Paleta de marca de MesaYa aplicada al tema de navegación (fondo de
// pantalla entre rutas, color por defecto de header/tab bar nativos), para
// que no se vea el azul/blanco genérico de Expo en ningún lado de la app.
const LightNavTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7f3065',
    background: Colors.light.background,
    card: '#ffffff',
    text: Colors.light.text,
    border: Colors.light.backgroundSelected,
    notification: '#dc3148',
  },
};

const DarkNavTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#c77fae',
    background: Colors.dark.background,
    card: '#211823',
    text: Colors.dark.text,
    border: Colors.dark.backgroundSelected,
    notification: '#f2687c',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Caprasimo_400Regular,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkNavTheme : LightNavTheme}>
      <AnimatedSplashOverlay />
      {fontsLoaded ? <Stack screenOptions={{ headerShown: false }} /> : null}
    </ThemeProvider>
  );
}
