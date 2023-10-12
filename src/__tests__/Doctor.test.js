import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Doctor from '../components/Doctor';
import store from '../redux/store';

describe('Doctor Profile Component', () => {
  test('renders Doctor Profile component', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Doctor />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
