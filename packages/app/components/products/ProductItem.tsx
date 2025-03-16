import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { useNavigate as useNavigateWeb } from 'react-router-dom';
import { useNavigate as useNavigateNative } from 'react-router-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

interface Props extends ViewProps {
  product: ProductResponse;
}

export default function ProductItem({ product, style, ...rest }: Props) {
  const navigate =
    Platform.OS === 'web' ? useNavigateWeb() : useNavigateNative();

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Pressable onPress={goToDetail} style={[styles.container, style]} {...rest}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${product.image.base64}` }}
        style={{ ...styles.image, width: '100%' }}
      />

      <StyledText format="subtitle">{product.name}</StyledText>

      <StyledText>{product.description}</StyledText>

      <StyledText format="small">{product.price} €</StyledText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.padding.item,
    backgroundColor: THEME.colors.backgroundSecundary,
    borderRadius: THEME.borderRadius.medium,
    borderColor: THEME.colors.details,
    borderWidth: THEME.borderWidth,
    gap: THEME.gap.small,
  },
  image: {
    aspectRatio: 1,
    borderRadius: THEME.borderRadius.medium,
  },
});
