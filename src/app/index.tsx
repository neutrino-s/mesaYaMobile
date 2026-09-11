import { Redirect } from 'expo-router';

/** Sin sesión de auth todavía en la app: "/" siempre entra por el login.
 * Cuando exista `useAuthSession`, acá se decide entre `/login` y `/(tabs)`. */
export default function Index() {
  return <Redirect href="/login" />;
}
