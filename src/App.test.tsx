import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react text', () => {
    render(<App />);
    const textElement = screen.getByText(/and save to reload/i);
    expect(textElement).toBeInTheDocument();
});
