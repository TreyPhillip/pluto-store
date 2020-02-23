import React from 'react';
import { render } from '@testing-library/react';
import Login from '../src/components/Login/Login';

test('renders login page', () => {
  const { getByText } = render(<Login />);
  const formElement = getByText(/Username/i);
  expect(formElement).toBeInTheDocument();
});
