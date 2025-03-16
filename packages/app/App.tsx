import { StyleSheet, View } from 'react-native';
import Header from './components/partials/Header';
import ProductDetailScreen from './pages/products/ProductDetailScreen';
import Products from './pages/products/Products';
import { Router, Route, Routes } from './router';
import { THEME } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
        </Routes>
      </Router>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
});
