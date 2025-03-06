import { StyleSheet, TextInput } from 'react-native';
import ProductsList from '../../components/products/ProductsList';
import { useProducts } from '../../hooks/useProducts';

export default function Products() {
  const { setFilter, products } = useProducts();

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setFilter(value)}
      />
      <ProductsList products={products} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 500,
    borderWidth: 1,
    borderColor: 'black',
  },
});
