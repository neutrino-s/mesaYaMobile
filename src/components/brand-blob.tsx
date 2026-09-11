import { Circle, Defs, RadialGradient, Stop, Svg } from 'react-native-svg';

interface BrandBlobProps {
  /** Color base del blob, sin alpha (el alpha se maneja con `opacity`). */
  color: string;
  opacity: number;
  /** Diámetro del blob en px. */
  size: number;
  /** Posición del centro, en fracción (0-1) del panel contenedor. */
  left: number;
  top: number;
  softStop?: number;
}

/** Círculo difuso de fondo, igual al `Blob` de `mesaYa/src/features/auth/components/BrandPanel.tsx`
 * pero con degradado radial real vía `react-native-svg` (RN no tiene
 * `radial-gradient` en CSS). */
export function BrandBlob({ color, opacity, size, left, top, softStop = 0.82 }: BrandBlobProps) {
  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: 'absolute',
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        transform: [{ translateX: -size / 2 }, { translateY: -size / 2 }],
      }}
      pointerEvents="none">
      <Defs>
        <RadialGradient id="blob" cx="50%" cy="50%" r="50%">
          <Stop offset={0} stopColor={color} stopOpacity={opacity} />
          <Stop offset={softStop} stopColor={color} stopOpacity={opacity} />
          <Stop offset={1} stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#blob)" />
    </Svg>
  );
}
