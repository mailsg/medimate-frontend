import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import store from '../redux/store';

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

describe('Hompage should render correctly', () => {
  test('tests the Homepage', () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
