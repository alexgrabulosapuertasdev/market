import { StyleSheet, Text } from 'react-native';
import { THEME } from '../../theme';

interface Props {
  children: any;
  format?: 'title' | 'subtitle' | 'text' | 'small' | 'button';
  style?: object;
}

export default function StyledText({ children, format, style }: Props) {
  const formatStyles = format ?? 'text';

  return <Text style={{ ...styles[formatStyles], ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: THEME.colors.primary,
    fontWeight: '700',
    fontSize: THEME.fontSizes.title,
  },
  subtitle: {
    fontSize: THEME.fontSizes.subtitle,
    fontWeight: 'bold',
  },
  text: {
    fontSize: THEME.fontSizes.text,
    color: THEME.colors.textPrimary,
  },
  small: {
    fontSize: THEME.fontSizes.small,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  button: {
    textAlign: 'center',
    color: THEME.colors.white,
    fontWeight: 'bold',
    fontSize: THEME.fontSizes.button,
  },
});
