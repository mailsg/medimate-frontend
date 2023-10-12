import { render } from '@testing-library/react'; // Change this line
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Side Navigation component', () => {
  test('Side Navigation component should match the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
