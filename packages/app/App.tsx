import { StyleSheet, View } from 'react-native';
import ProductsList from './pages/products/ProductsList';

export default function App() {
  return (
    <View style={styles.container}>
      <ProductsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
