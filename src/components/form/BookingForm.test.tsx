import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../i18n/locales/en.json';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('BookingForm', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const renderComponent = (locale = 'en') => {
    const messages = locale === 'en' ? enMessages : {};
    
    return render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <BookingForm locale={locale} />
      </NextIntlClientProvider>
    );
  };

  it('renders the form with all required fields', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/single occupancy/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: {} }),
    });
    
    renderComponent();
    
    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    
    // Select travel purpose
    const personalOption = screen.getByLabelText(/personal/i);
    fireEvent.click(personalOption);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/submit', expect.any(Object));
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});