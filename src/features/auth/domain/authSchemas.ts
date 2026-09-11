import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Ingresá tu correo electrónico.').email('Ingresá un correo electrónico válido.'),
  password: z.string().min(1, 'Ingresá tu contraseña.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    nombre: z.string().trim().min(1, 'Ingresá tu nombre.'),
    apellido: z.string().trim().min(1, 'Ingresá tu apellido.'),
    email: z.string().min(1, 'Ingresá tu correo electrónico.').email('Ingresá un correo electrónico válido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Repetí tu contraseña.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
