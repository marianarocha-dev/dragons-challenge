import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface TestProvidersProps {
  children: React.ReactNode;
}

export const TestProviders = ({ children }: TestProvidersProps): React.ReactElement => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};