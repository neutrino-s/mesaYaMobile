import { Loader2 } from 'lucide-react-native';
import { useEffect } from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLoader2 = Animated.createAnimatedComponent(Loader2);

interface SpinnerProps {
  size?: number;
  color?: string;
}

/** Equivalente al `animate-spin` de Tailwind para el ícono de carga del
 * botón de submit — RN no anima CSS, así que se gira a mano con reanimated. */
export function Spinner({ size = 20, color = '#ffffff' }: SpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 800, easing: Easing.linear }), -1);
    return () => cancelAnimation(rotation);
  }, [rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return <AnimatedLoader2 size={size} color={color} style={style} />;
}
