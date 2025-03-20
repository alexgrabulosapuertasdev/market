import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../../theme';

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export default function Styledicon({
  name,
  size = 30,
  color = THEME.colors.white,
}: Props) {
  return <Icon name={name} size={size} color={color} />;
}
