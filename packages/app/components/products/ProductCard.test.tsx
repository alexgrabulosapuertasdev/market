import { render } from '@testing-library/react-native';
import ProductCard from './ProductCard';
import { ProductResponse } from '../../models/interfaces/Product';
import { ProductMother } from '../../models/mothers/ProductMother';

describe('<ProductCard />', () => {
  it('renders correctly with given product data', () => {
    const product: ProductResponse = ProductMother.createProductResponse();

    const componente = render(ProductCard({ product }));
    const { getByText, getByTestId } = componente;
    const image = getByTestId('product-card-image');

    expect(componente).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(getByText(product.description)).toBeTruthy();
    expect(getByText(`${product.price} €`)).toBeTruthy();
    expect(image.props.source.uri).toBe(
      `data:image/jpeg;base64,${product.image.base64}`,
    );
  });
});
