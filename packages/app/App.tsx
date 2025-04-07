import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { CartProvider } from './contexts/CartContext';
import CartList from './components/cart/CartList';
import Header from './components/partials/Header';
import LoginScreen from './pages/login/LoginScreen';
import ProductDetailScreen from './pages/products/ProductDetailScreen';
import Products from './pages/products/Products';
import { THEME } from './theme';

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: [],
  config: {
    screens: {
      Products: '',
      ProductDetail: 'product/:id',
      Login: 'login',
    },
  },
};

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <NavigationContainer linking={linking}>
          <Header />
          <CartList />
          <Stack.Navigator id={undefined} initialRouteName="Products">
            <Stack.Screen
              name="Products"
              component={Products}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
});
