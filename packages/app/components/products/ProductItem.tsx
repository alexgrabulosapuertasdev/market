import { Image, StyleSheet, View } from 'react-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

interface Props {
  product: ProductResponse;
  style?: object;
}

export default function ProductItem({ product, style }: Props) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${product.image.base64}` }}
        style={{ ...styles.image, width: '100%' }}
      />

      <StyledText format="subtitle">{product.name}</StyledText>

      <StyledText>{product.description}</StyledText>

      <StyledText format="small">{product.price} €</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.padding.item,
    backgroundColor: THEME.colors.backgroundSecundary,
    borderRadius: THEME.borderRadius.medium,
    borderColor: THEME.colors.details,
    borderWidth: 1,
    gap: THEME.gap.small,
  },
  image: {
    aspectRatio: 1,
    borderRadius: THEME.borderRadius.medium,
  },
});
