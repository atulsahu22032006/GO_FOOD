import { render, screen } from '@testing-library/react';
import App from './App';

test('renders order food online text', () => {
  render(<App />);
  const textElement = screen.getByText(/Order food online/i);
  expect(textElement).toBeInTheDocument();
});

