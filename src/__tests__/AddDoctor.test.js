import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddDoctor from '../components/AddDoctor';
import store from '../redux/store';

describe('Add Doctor Form Component', () => {
  test('renders Add Doctor Form component', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddDoctor />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
