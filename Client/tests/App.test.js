import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/containers/App';

test('renders home page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Pluto Store/);
  expect(linkElement).toBeInTheDocument();
});
