import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

import type { AuthUser, LoginInput, RegisterInput } from '../domain/types';

function toAuthUser(user: User): AuthUser {
  return { uid: user.uid, email: user.email, displayName: user.displayName };
}

/** Único lugar de esta feature que importa `firebase/auth`. */
export const authRepository = {
  async login({ email, password }: LoginInput): Promise<AuthUser> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(credential.user);
  },

  async register({ nombre, apellido, email, password }: RegisterInput): Promise<AuthUser> {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: `${nombre} ${apellido}` });
    return toAuthUser(credential.user);
  },
};
