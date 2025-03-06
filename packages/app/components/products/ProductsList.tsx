import { FlatList, StyleSheet, View } from 'react-native';
import ProductItem from './ProductItem';
import StyledText from '../ui/StyledText';
import { ProductResponse } from '../../models/interfaces/Product';

interface Props {
  products: ProductResponse[];
}

export default function ProductsList({ products }: Props) {
  return (
    <View style={styles.container}>
      <StyledText format="title" style={styles.title}>
        Products list
      </StyledText>
      <FlatList
        style={styles.productList}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <>
            <ProductItem product={item} />
          </>
        )}
        horizontal={true}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 1000,
  },
  title: {
    marginBottom: 24,
  },
  productList: {
    width: 1000,
    display: 'flex',
    gap: '16px 24px',
    flexWrap: 'wrap',
  },
});
