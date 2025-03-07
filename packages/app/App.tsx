import { StyleSheet, View } from 'react-native';
import Header from './components/partials/Header';
import Products from './pages/products/Products';
import { THEME } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
});
