import { FlatList, useWindowDimensions } from 'react-native';
import ProductItem from './ProductItem';
import { ProductResponse } from '../../models/interfaces/Product';
import { THEME } from '../../theme';

interface Props {
  products: ProductResponse[];
}

function getResponsiveProperties(width: number, spacing: number) {
  const minCardWidth = 300;
  const numColumns = Math.floor(width / minCardWidth);
  const cardWidth = (width - spacing * (numColumns + 1)) / numColumns;

  return { cardWidth, numColumns };
}

export default function ProductsList({ products }: Props) {
  const gap = THEME.gap.large;
  const { width } = useWindowDimensions();
  const { cardWidth, numColumns } = getResponsiveProperties(width, gap);
  const columnWrapperStyle = numColumns > 1 ? { gap } : undefined;

  return (
    <FlatList
      contentContainerStyle={{ gap }}
      columnWrapperStyle={columnWrapperStyle}
      showsVerticalScrollIndicator={false}
      data={products}
      numColumns={numColumns}
      key={numColumns}
      keyExtractor={(product) => product.id}
      renderItem={({ item }) => (
        <ProductItem
          key={item.id}
          product={item}
          style={{ width: cardWidth }}
          testID="product-item"
        />
      )}
    />
  );
}
