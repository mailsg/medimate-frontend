import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Doctors from '../components/Doctors';

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

describe('Doctors Component', () => {
  test('renders doctors', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Doctors />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
