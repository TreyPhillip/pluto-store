import React from 'react';
import { render } from '@testing-library/react';
import Login from '../src/components/Login/Login';

test('renders login page', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});
