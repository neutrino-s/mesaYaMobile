// El rollup de tipos público de `firebase/auth` no incluye
// `getReactNativePersistence` (solo existe en el build específico de RN,
// `@firebase/auth/dist/rn/index.rn.d.ts`, que TypeScript no puede resolver a
// través del `exports` del paquete). En runtime sí está disponible: Metro
// resuelve `firebase/auth` -> `@firebase/auth` con la condición
// `react-native`, que sí expone esta función. Este augment solo agrega el
// tipo que falta.
export {};

declare module 'firebase/auth' {
  export interface ReactNativeAsyncStorage {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
  }

  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
}
