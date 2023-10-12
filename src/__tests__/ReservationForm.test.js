import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReservationForm from '../components/ReservationForm';
import store from '../redux/store';

describe('Reservation Form Component', () => {
  test('renders Reservation Form component', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReservationForm />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
