import { StyleSheet, View } from 'react-native';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

export default function Header() {
  return (
    <View style={styles.container}>
      <StyledText format="title">Market</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.padding.container,
    backgroundColor: THEME.colors.backgroundSecundary,
    width: '100%',
    boxShadow: '0 4px 8px 4px ' + THEME.colors.details,
  },
});
