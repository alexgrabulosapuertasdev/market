import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

interface Props extends ViewProps {
  product: ProductResponse;
}

export default function ProductItem({ product, style, ...rest }: Props) {
  return (
    <View style={[styles.container, style]} {...rest}>
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
