/** Traduce los códigos de error de Firebase Auth a mensajes en español para
 * mostrar en la UI. Sin esto, el usuario vería strings tipo
 * "auth/email-already-in-use" directo del SDK. */
export function mapFirebaseAuthError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo electrónico.';
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/weak-password':
      return 'La contraseña es muy débil (mínimo 6 caracteres).';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Probá de nuevo en unos minutos.';
    case 'auth/network-request-failed':
      return 'No hay conexión a internet. Revisá tu red e intentá de nuevo.';
    default:
      return 'Ocurrió un error inesperado. Intentá de nuevo.';
  }
}
