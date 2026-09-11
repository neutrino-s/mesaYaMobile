import { Image, Text, View } from 'react-native';

interface WordmarkProps {
  /** `true` cuando va sobre el degradado de marca. */
  onDark?: boolean;
  markSize?: number;
  textSize?: number;
}

/** La marca, igual a `mesaYa/src/components/shared/Wordmark.tsx`: mismo
 * logo, cambia solo el color del texto según el fondo. */
export function Wordmark({ onDark = false, markSize = 48, textSize = 26 }: WordmarkProps) {
  return (
    <View className="flex-row items-center" style={{ gap: markSize * 0.12 }}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: markSize, height: markSize }}
        resizeMode="contain"
      />
      <Text
        className={onDark ? 'font-heading text-white' : 'font-heading text-primary'}
        style={{ fontSize: textSize }}>
        MesaYa
      </Text>
    </View>
  );
}
