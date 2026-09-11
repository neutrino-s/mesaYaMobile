import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandBlob } from '@/components/brand-blob';
import { Spinner } from '@/components/spinner';
import { Wordmark } from '@/components/wordmark';
import { registerSchema, type RegisterFormValues } from '@/features/auth/domain/authSchemas';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { useState } from 'react';

const MUTED_FOREGROUND = '#6b4a5c';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { register: registerUser, submitting, error, clearError } = useRegister();
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nombre: '', apellido: '', email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(values: RegisterFormValues) {
    const user = await registerUser({
      nombre: values.nombre,
      apellido: values.apellido,
      email: values.email,
      password: values.password,
    });
    if (user) router.replace('/(tabs)/home');
  }

  return (
    <View className="flex-1 bg-auth-canvas">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Mismo panel de marca que el login, en su versión compacta. */}
          <View
            className="relative isolate overflow-hidden"
            style={{ paddingTop: insets.top + 28 }}>
            <LinearGradient
              colors={['#8a3468', '#48102c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <BrandBlob color="#dc3148" opacity={0.85} size={260} left={0.92} top={0.05} />
            <BrandBlob
              color="#edacc4"
              opacity={0.16}
              size={340}
              left={0.02}
              top={0.85}
              softStop={0.35}
            />
            <BrandBlob color="#dc3148" opacity={0.8} size={220} left={0.68} top={1.05} />

            <View className="gap-4 px-6 pb-9">
              <Wordmark onDark markSize={40} textSize={22} />
              <Text className="font-heading text-[1.75rem] leading-9 text-white">
                Registrá tu restaurante{'\n'}en un par de pasos.
              </Text>
            </View>
          </View>

          {/* Formulario */}
          <View className="flex-1 px-6 pb-10 pt-8">
            <Text className="font-heading text-[2rem] text-foreground">Crear cuenta</Text>
            <Text className="mt-1.5 font-sans text-[15px] text-muted-foreground">
              Sumá a tu restaurante a MesaYa.
            </Text>

            <View className="mt-8 gap-5">
              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Nombre</Text>
                <Controller
                  control={control}
                  name="nombre"
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearError();
                      }}
                      placeholder="Juan"
                      placeholderTextColor={MUTED_FOREGROUND}
                      autoCapitalize="words"
                      autoComplete="given-name"
                      className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 font-sans text-[15px] text-foreground"
                    />
                  )}
                />
                {errors.nombre ? (
                  <Text className="font-sans text-[13px] text-destructive">{errors.nombre.message}</Text>
                ) : null}
              </View>

              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Apellido</Text>
                <Controller
                  control={control}
                  name="apellido"
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearError();
                      }}
                      placeholder="Pérez"
                      placeholderTextColor={MUTED_FOREGROUND}
                      autoCapitalize="words"
                      autoComplete="family-name"
                      className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 font-sans text-[15px] text-foreground"
                    />
                  )}
                />
                {errors.apellido ? (
                  <Text className="font-sans text-[13px] text-destructive">{errors.apellido.message}</Text>
                ) : null}
              </View>

              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Correo electrónico</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearError();
                      }}
                      placeholder="tu@restaurante.com"
                      placeholderTextColor={MUTED_FOREGROUND}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 font-sans text-[15px] text-foreground"
                    />
                  )}
                />
                {errors.email ? (
                  <Text className="font-sans text-[13px] text-destructive">{errors.email.message}</Text>
                ) : null}
              </View>

              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Contraseña</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <View className="relative justify-center">
                      <TextInput
                        value={value}
                        onChangeText={(text) => {
                          onChange(text);
                          clearError();
                        }}
                        placeholder="••••••••"
                        placeholderTextColor={MUTED_FOREGROUND}
                        secureTextEntry={obscurePassword}
                        autoComplete="new-password"
                        className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 pr-12 font-sans text-[15px] text-foreground"
                      />
                      <Pressable
                        onPress={() => setObscurePassword((prev) => !prev)}
                        hitSlop={8}
                        className="absolute right-0 h-13 w-12 items-center justify-center">
                        {obscurePassword ? (
                          <Eye size={20} color={MUTED_FOREGROUND} />
                        ) : (
                          <EyeOff size={20} color={MUTED_FOREGROUND} />
                        )}
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password ? (
                  <Text className="font-sans text-[13px] text-destructive">{errors.password.message}</Text>
                ) : null}
              </View>

              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Repetir contraseña</Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { value, onChange } }) => (
                    <View className="relative justify-center">
                      <TextInput
                        value={value}
                        onChangeText={(text) => {
                          onChange(text);
                          clearError();
                        }}
                        placeholder="••••••••"
                        placeholderTextColor={MUTED_FOREGROUND}
                        secureTextEntry={obscureConfirmPassword}
                        autoComplete="new-password"
                        className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 pr-12 font-sans text-[15px] text-foreground"
                      />
                      <Pressable
                        onPress={() => setObscureConfirmPassword((prev) => !prev)}
                        hitSlop={8}
                        className="absolute right-0 h-13 w-12 items-center justify-center">
                        {obscureConfirmPassword ? (
                          <Eye size={20} color={MUTED_FOREGROUND} />
                        ) : (
                          <EyeOff size={20} color={MUTED_FOREGROUND} />
                        )}
                      </Pressable>
                    </View>
                  )}
                />
                {errors.confirmPassword ? (
                  <Text className="font-sans text-[13px] text-destructive">
                    {errors.confirmPassword.message}
                  </Text>
                ) : null}
              </View>

              {error ? (
                <View className="flex-row items-start gap-2.5 rounded-md border border-destructive/35 bg-destructive/10 px-4 py-3">
                  <AlertCircle size={18} color="#dc3148" style={{ marginTop: 2 }} />
                  <Text className="flex-1 font-sans text-[13px] leading-[18px] text-foreground">{error}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={submitting}
                className="h-13 items-center justify-center rounded-md bg-brand-crimson active:opacity-90 disabled:opacity-60">
                {submitting ? (
                  <Spinner size={20} />
                ) : (
                  <Text className="font-sans text-[15px] font-medium text-white">Crear cuenta</Text>
                )}
              </Pressable>
            </View>

            <View className="mt-6 flex-row justify-center gap-1.5">
              <Text className="font-sans text-[13px] text-muted-foreground">¿Ya tenés cuenta?</Text>
              <Link href="/login" replace>
                <Text className="font-sans text-[13px] font-medium text-accent">Iniciar sesión</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
