import React from 'react';
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});
