import { FlatList, Image, StyleSheet, View } from 'react-native';
import Quantity from '../common/Quantity';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';
import { useCartContext } from '../../contexts/CartContext';
import StyledButton from '../ui/StyledButton';

export default function CartList() {
  const { productsCart, addProduct, deleteProduct, decreaseProduct, showCart } =
    useCartContext();

  return (
    <>
      {showCart && (
        <FlatList
          contentContainerStyle={{ gap: THEME.gap.medium }}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          data={productsCart}
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${item.image.base64}`,
                }}
                style={styles.image}
              />
              <StyledText format="subtitle">{item.name}</StyledText>
              <View style={styles.flexBetween}>
                <StyledText format="small">{item.price} €</StyledText>
                <StyledButton
                  icon="delete"
                  onPress={() => deleteProduct(item.id)}
                  iconSize="small"
                  small={true}
                  format="danger"
                ></StyledButton>
              </View>
              <Quantity
                add={() => addProduct(item)}
                decrease={() => decreaseProduct(item.id)}
                quantity={item.quantity}
              />
            </View>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.backgroundPrimary,
    borderRadius: THEME.borderRadius.medium,
    boxShadow: '0 0 8px 4px ' + THEME.colors.details,
    height: '100%',
    maxWidth: 200,
    padding: THEME.padding.container,
    position: 'absolute',
    width: '50%',
    zIndex: 1,
  },
  image: {
    aspectRatio: 1,
    borderRadius: THEME.borderRadius.medium,
    width: '100%',
  },
  item: {
    gap: THEME.gap.medium,
    borderBottomColor: THEME.colors.details,
    borderBottomWidth: THEME.borderWidth,
    paddingBottom: THEME.padding.item,
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
