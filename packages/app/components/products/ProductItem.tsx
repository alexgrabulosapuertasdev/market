import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, ViewProps } from 'react-native';
import { ProductResponse } from '../../models/interfaces/Product';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';

type RootStackParamList = {
  ProductDetail: { id: string };
};

interface Props extends ViewProps {
  product: ProductResponse;
}

export default function ProductItem({ product, style, ...rest }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToDetail = () => {
    navigation.navigate('ProductDetail', { id: product.id });
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
