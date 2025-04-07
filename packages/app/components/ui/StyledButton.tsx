import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { THEME } from '../../theme';
import StyledText from './StyledText';
import Styledicon from './StyledIcon';

interface Props extends ViewProps {
  onPress: () => void;
  text?: string;
  icon?: string;
  iconSize?: 'small';
  small?: boolean;
  format?: 'success' | 'danger' | 'transparent';
}

export default function StyledButton({
  icon,
  iconSize,
  text,
  onPress,
  style,
  small = false,
  format,
}: Props) {
  const colorIcon =
    format === 'transparent' ? THEME.colors.textPrimary : undefined;

  const sizeIcon = iconSize === 'small' ? 20 : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.default,
        style,
        small && styles.small,
        format && styles[format],
      ]}
    >
      {icon && <Styledicon name={icon} size={sizeIcon} color={colorIcon} />}
      {text && <StyledText format="button">{text}</StyledText>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: THEME.borderRadius.large,
    boxShadow: '0 0 8px 4px ' + THEME.colors.details,
    backgroundColor: THEME.colors.primary,
    padding: THEME.padding.item,
    width: 'auto',
    flexDirection: 'row',
    gap: THEME.gap.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    aspectRatio: 1,
    width: 20,
  },
  success: {
    backgroundColor: THEME.colors.green,
  },
  danger: {
    backgroundColor: THEME.colors.red,
  },
  transparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
});
