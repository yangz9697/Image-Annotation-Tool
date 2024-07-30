import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage', () => {
  render(<App />);
  expect(
    screen.getByText('Upload and Click Image to Make Annotations')
  ).toBeInTheDocument();
});
