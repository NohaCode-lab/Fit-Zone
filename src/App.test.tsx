import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProviders } from './app/providers';

describe('Fit-Zone Application Baseline Suite', () => {
  it('passes sanity environment check', () => {
    expect(true).toBe(true);
  });

  it('renders application without crashing', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    // Verify presence of brand title in document
    const brandElements = screen.getAllByText(/Fit/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });
});
