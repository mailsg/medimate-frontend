import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth_pages/Login';

describe('Login component', () => {
  it('Should render the component correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
