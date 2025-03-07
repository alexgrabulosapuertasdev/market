import { StyleSheet, TextInput, View } from 'react-native';
import ProductsList from '../../components/products/ProductsList';
import { useProducts } from '../../hooks/useProducts';
import { THEME } from '../../theme';

export default function Products() {
  const { setFilter, products } = useProducts();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setFilter(value)}
        placeholder="Buscar..."
      />
      <ProductsList products={products} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.padding.container,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.details,
    width: '100%',
    height: 48,
    padding: THEME.padding.item,
    marginBottom: 24,
    borderRadius: THEME.borderRadius.large,
    fontSize: THEME.fontSizes.text,
    color: THEME.colors.textPrimary,
  },
});
