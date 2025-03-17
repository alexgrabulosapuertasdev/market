import { render } from '@testing-library/react-native';
import ProductItem from './ProductItem';
import { ProductResponse } from '../../models/interfaces/Product';
import { ProductMother } from '../../models/mothers/ProductMother';
import { MemoryRouter } from 'react-router-dom';

describe('<ProductItem />', () => {
  it('renders correctly with given product data', () => {
    const product: ProductResponse = ProductMother.createProductResponse();

    const componente = render(
      <MemoryRouter>
        <ProductItem product={product} />
      </MemoryRouter>,
    );
    const { getByText } = componente;

    expect(componente).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(getByText(product.description)).toBeTruthy();
    expect(getByText(`${product.price} €`)).toBeTruthy();
  });
});
