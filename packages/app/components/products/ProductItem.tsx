import { Image, StyleSheet, View } from 'react-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';

interface Props {
  product: ProductResponse;
}

export default function ProductItem({ product }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${product.image.base64}` }}
        style={{ ...styles.image, width: '100%' }}
      />

      <View style={styles.textContainer}>
        <StyledText format="subtitle" style={styles.productName}>
          {product.name}
        </StyledText>

        <StyledText format="text" style={styles.productDescription}>
          {product.description}
        </StyledText>

        <StyledText style={styles.productPrice}>{product.price} €</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2, // Sombra en Android
    width: 300,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});
