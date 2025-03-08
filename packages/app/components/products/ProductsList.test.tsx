import { render } from '@testing-library/react-native';
import ProductsList from './ProductsList';
import { ProductResponse } from '../../models/interfaces/Product';
import { ProductMother } from '../../models/mothers/ProductMother';

describe('<ProductsList />', () => {
  it('renders correctly with given product data', () => {
    const products: ProductResponse[] = [
      ProductMother.createProductResponse(),
      ProductMother.createProductResponse(),
    ];

    const component = render(<ProductsList products={products} />);
    const { getAllByTestId } = component;

    expect(component).toBeTruthy();
    expect(getAllByTestId('product-item').length).toBe(products.length);
  });
});
