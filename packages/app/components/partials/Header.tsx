import { Pressable, StyleSheet, View } from 'react-native';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';
import StyledButton from '../ui/StyledButton';
import { useCartContext } from '../../contexts/CartContext';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { productsCart, setShowCart } = useCartContext();
  const totalProducts = productsCart.reduce((acc, current) => {
    return (acc += current.quantity);
  }, 0);

  const goToHome = () => {
    navigation.navigate('Products');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goToHome}>
        <StyledText format="title">Market</StyledText>
      </Pressable>

      <StyledButton
        icon="cart-plus"
        text={totalProducts !== 0 ? ' ' + totalProducts : undefined}
        onPress={() => {
          setShowCart((prevShowCart: boolean) => !prevShowCart);
        }}
      ></StyledButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.padding.container,
    backgroundColor: THEME.colors.backgroundSecundary,
    width: '100%',
    boxShadow: '0 4px 8px 4px ' + THEME.colors.details,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
