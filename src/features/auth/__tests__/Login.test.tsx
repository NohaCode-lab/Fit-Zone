import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoginModal } from '../components/LoginModal';

describe('LoginModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<LoginModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText(/Sign In to/i)).toBeNull();
  });

  it('renders form controls when isOpen is true', () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Sign In to/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeDefined();
  });
});
