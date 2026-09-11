import { FirebaseError } from 'firebase/app';
import { useCallback, useState } from 'react';

import { authRepository } from '../data/authRepository';
import { mapFirebaseAuthError } from '../domain/authRules';
import type { AuthUser, LoginInput } from '../domain/types';

interface UseLoginResult {
  login: (input: LoginInput) => Promise<AuthUser | null>;
  submitting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useLogin(): UseLoginResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (input: LoginInput) => {
    setSubmitting(true);
    setError(null);
    try {
      return await authRepository.login(input);
    } catch (err) {
      setError(mapFirebaseAuthError(err instanceof FirebaseError ? err.code : 'unknown'));
      return null;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { login, submitting, error, clearError: () => setError(null) };
}
