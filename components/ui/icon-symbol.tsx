import { MaterialIcons } from '@expo/vector-icons';
import { type ComponentProps } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';

type MaterialIconsName = ComponentProps<typeof MaterialIcons>['name'];

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'plus': 'add',
  'user.graduate.fill': 'school',
  'location.pin.fill': 'location-pin',
  // PENAMBAHAN MAPPING IKON PETA
  'map.fill': 'map',
  'globe.fill': 'public', // 'public' adalah ikon globe di Material Icons
};

type IconSymbolName = keyof typeof MAPPING;

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
  const iconName = MAPPING[name] as MaterialIconsName;
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}