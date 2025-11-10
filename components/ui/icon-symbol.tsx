import { MaterialIcons } from '@expo/vector-icons';
import { type ComponentProps } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';

// Ini adalah tipe untuk properti `name` dari komponen MaterialIcons
type MaterialIconsName = ComponentProps<typeof MaterialIcons>['name'];

// Definisi tipe dan pemetaan ikon Anda
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'plus': 'add',
  'user.graduate.fill': 'school',
  // Penambahan mapping baru untuk ikon lokasi
  'location.pin.fill': 'location-pin',
};

type IconSymbolName = keyof typeof MAPPING;

// Fungsi komponen IconSymbol Anda
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  // Ambil nama ikon Material Icons dari MAPPING dan pastikan tipenya benar
  const iconName = MAPPING[name] as MaterialIconsName;

  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}