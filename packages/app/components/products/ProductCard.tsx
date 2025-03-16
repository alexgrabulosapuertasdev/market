import { Image, StyleSheet, View } from 'react-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

interface Props {
  product: ProductResponse;
}

export default function ProductCard({ product }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${product.image.base64}` }}
        style={styles.image}
        testID="product-card-image"
      />

      <View style={styles.info}>
        <StyledText format="subtitle">{product.name}</StyledText>
        <StyledText>{product.description}</StyledText>
        <StyledText format="small">{product.price} €</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: THEME.colors.details,
    borderRadius: THEME.borderRadius.medium,
    borderWidth: THEME.borderWidth,
    gap: THEME.gap.medium,
    flexDirection: 'row',
    margin: THEME.padding.container,
    padding: THEME.padding.container,
  },
  image: {
    aspectRatio: 1,
    borderRadius: THEME.borderRadius.medium,
    flex: 1,
  },
  info: {
    gap: THEME.gap.large,
    flex: 1,
  },
});
