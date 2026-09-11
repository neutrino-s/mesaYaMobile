export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}
