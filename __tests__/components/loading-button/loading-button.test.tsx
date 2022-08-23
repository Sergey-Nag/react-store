import { render } from '@testing-library/react';
import { LoadingButton } from '../../../src/components/loading-button/loading-button';

describe('Loading button', () => {
  it('Should render button without loader if the loading property is false', () => {
    const { asFragment } = render(<LoadingButton loading={false}>test</LoadingButton>);

    expect(asFragment()).toMatchSnapshot('without loader');
  });

  it('Should render button with loader if the loading property is true', () => {
    const { asFragment } = render(<LoadingButton loading={true}>test</LoadingButton>);

    expect(asFragment()).toMatchSnapshot('with loader');
  });
});