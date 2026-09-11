import { FirebaseError } from 'firebase/app';
import { useCallback, useState } from 'react';

import { authRepository } from '../data/authRepository';
import { mapFirebaseAuthError } from '../domain/authRules';
import type { AuthUser, RegisterInput } from '../domain/types';

interface UseRegisterResult {
  register: (input: RegisterInput) => Promise<AuthUser | null>;
  submitting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useRegister(): UseRegisterResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (input: RegisterInput) => {
    setSubmitting(true);
    setError(null);
    try {
      return await authRepository.register(input);
    } catch (err) {
      setError(mapFirebaseAuthError(err instanceof FirebaseError ? err.code : 'unknown'));
      return null;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { register, submitting, error, clearError: () => setError(null) };
}
