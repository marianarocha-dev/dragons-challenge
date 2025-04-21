import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { TestProviders } from './TestProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<Parameters<typeof rtlRender>[1], 'wrapper'>
) => rtlRender(ui, { wrapper: TestProviders, ...options });

export { customRender as render, screen, fireEvent, waitFor };