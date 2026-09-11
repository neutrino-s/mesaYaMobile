import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
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
import { useLogin } from '@/features/auth/hooks/useLogin';

const MUTED_FOREGROUND = '#6b4a5c';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login, submitting, error: authError, clearError } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);
  const [remember, setRemember] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const error = formError ?? authError;

  async function handleSubmit() {
    if (!email || !password) {
      setFormError('Completá tu correo y contraseña para continuar.');
      return;
    }
    setFormError(null);
    clearError();
    const user = await login({ email, password });
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
          {/* Panel de marca: mismo degradado ciruela y blobs carmesí que el
              BrandPanel del login web, en su versión compacta (mobile). */}
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
                La carta en el celular,{'\n'}el pedido en la mesa.
              </Text>
            </View>
          </View>

          {/* Formulario */}
          <View className="flex-1 px-6 pb-10 pt-8">
            <Text className="font-heading text-[2rem] text-foreground">Iniciar sesión</Text>
            <Text className="mt-1.5 font-sans text-[15px] text-muted-foreground">
              Accedé al panel de tu restaurante.
            </Text>

            <View className="mt-8 gap-5">
              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Correo electrónico</Text>
                <TextInput
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    setFormError(null);
                    clearError();
                  }}
                  placeholder="tu@restaurante.com"
                  placeholderTextColor={MUTED_FOREGROUND}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 font-sans text-[15px] text-foreground"
                />
              </View>

              <View className="gap-2">
                <Text className="font-sans text-sm font-medium text-foreground">Contraseña</Text>
                <View className="relative justify-center">
                  <TextInput
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                      setFormError(null);
                      clearError();
                    }}
                    placeholder="••••••••"
                    placeholderTextColor={MUTED_FOREGROUND}
                    secureTextEntry={obscurePassword}
                    autoComplete="current-password"
                    className="h-13 rounded-md border border-auth-field-border bg-auth-field-fill px-4 pr-12 font-sans text-[15px] text-foreground"
                  />
                  <Pressable
                    onPress={() => setObscurePassword((value) => !value)}
                    hitSlop={8}
                    className="absolute right-0 h-13 w-12 items-center justify-center">
                    {obscurePassword ? (
                      <Eye size={20} color={MUTED_FOREGROUND} />
                    ) : (
                      <EyeOff size={20} color={MUTED_FOREGROUND} />
                    )}
                  </Pressable>
                </View>
              </View>

              <View className="flex-row items-center">
                <Pressable
                  onPress={() => setRemember((value) => !value)}
                  className="flex-row items-center gap-2.5">
                  <View
                    className={
                      remember
                        ? 'h-5 w-5 items-center justify-center rounded border border-primary bg-primary'
                        : 'h-5 w-5 items-center justify-center rounded border border-input bg-card'
                    }>
                    {remember ? <Check size={14} color="#ffffff" /> : null}
                  </View>
                  <Text className="font-sans text-foreground">Recordarme</Text>
                </Pressable>

                <Pressable className="ml-auto" hitSlop={8}>
                  <Text className="font-sans text-sm font-medium text-accent">¿Olvidaste tu contraseña?</Text>
                </Pressable>
              </View>

              {error ? (
                <View className="flex-row items-start gap-2.5 rounded-md border border-destructive/35 bg-destructive/10 px-4 py-3">
                  <AlertCircle size={18} color="#dc3148" style={{ marginTop: 2 }} />
                  <Text className="flex-1 font-sans text-[13px] leading-[18px] text-foreground">{error}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                className="h-13 items-center justify-center rounded-md bg-brand-crimson active:opacity-90 disabled:opacity-60">
                {submitting ? (
                  <Spinner size={20} />
                ) : (
                  <Text className="font-sans text-[15px] font-medium text-white">Ingresar</Text>
                )}
              </Pressable>
            </View>

            <View className="my-6 flex-row items-center gap-4">
              <View className="h-px flex-1 bg-border" />
              <Text className="font-sans text-[13px] text-muted-foreground">o</Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <Link href="/register" asChild>
              <Pressable className="h-13 items-center justify-center rounded-md border border-input bg-card active:bg-muted/60">
                <Text className="font-sans text-[15px] font-medium text-foreground">
                  Registrar mi restaurante
                </Text>
              </Pressable>
            </Link>

            <Text className="mt-6 text-center font-sans text-[13px] text-muted-foreground">
              ¿Eres mozo? Pedí tu acceso al administrador del local.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
