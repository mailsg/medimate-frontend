import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Reserve from '../components/Reserve';

describe('Booking Component', () => {
  test('renders Booking component', () => {
    const { container } = render(
      <BrowserRouter>
        <Reserve />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
