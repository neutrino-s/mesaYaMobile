import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';

import type { AuthUser, LoginInput, RegisterInput } from '../domain/types';

function toAuthUser(user: User): AuthUser {
  return { uid: user.uid, email: user.email, displayName: user.displayName };
}

/** Único lugar de esta feature que importa Firebase (`firebase/auth` +
 * `firebase/firestore`). */
export const authRepository = {
  async login({ email, password }: LoginInput): Promise<AuthUser> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(credential.user);
  },

  async register({ nombre, apellido, email, password }: RegisterInput): Promise<AuthUser> {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: `${nombre} ${apellido}` });
    await setDoc(doc(db, 'usuarios', credential.user.uid), {
      nombre,
      apellido,
      email,
      creadoEn: serverTimestamp(),
    });
    const user = toAuthUser(credential.user);
    // `createUserWithEmailAndPassword` deja al usuario logueado; se cierra la
    // sesión para que tenga que volver a ingresar usuario y contraseña desde
    // el login, como pide el flujo de la app.
    await signOut(auth);
    return user;
  },
};
