import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import ProductItem from './ProductItem';
import { ProductResponse } from '../../models/interfaces/Product';
import { ProductMother } from '../../models/mothers/ProductMother';

describe('<ProductItem />', () => {
  it('renders correctly with given product data', () => {
    const product: ProductResponse = ProductMother.createProductResponse();

    const componente = render(
      <NavigationContainer>
        <ProductItem product={product} />
      </NavigationContainer>,
    );
    const { getByText } = componente;

    expect(componente).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(getByText(product.description)).toBeTruthy();
    expect(getByText(`${product.price} €`)).toBeTruthy();
  });
});
