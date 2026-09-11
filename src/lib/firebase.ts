import AsyncStorage from '@react-native-async-storage/async-storage';
import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2YwJK5I09CO4fzXBAXNyG-gUBymQCmug',
  authDomain: 'resto-mobile-a27a2.firebaseapp.com',
  projectId: 'resto-mobile-a27a2',
  storageBucket: 'resto-mobile-a27a2.firebasestorage.app',
  messagingSenderId: '476684934717',
  appId: '1:476684934717:web:c488324c6e9051e6369454',
};

export const firebaseApp: FirebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);

export const auth: Auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
