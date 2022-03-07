import { render, screen } from '@testing-library/react';
import AppRouter from './components/Router';

test('renders learn react link', () => {
  render(<AppRouter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
