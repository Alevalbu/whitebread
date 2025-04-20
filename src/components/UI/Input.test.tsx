import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  // Text Input Tests
  describe('Text Input', () => {

    test('shows required asterisk when required prop is true', () => {
      render(
        <Input 
          type="text" 
          label="Username" 
          required={true} 
        />
      );
      
      const label = screen.getByText('Username');
      expect(label.parentElement).toHaveTextContent('*');
    });
});

    test('displays error message when error prop is provided', () => {
      render(
        <Input 
          type="text" 
          label="Username" 
          error="Username is required" 
        />
      );
      
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });

  // Phone Input Tests
  describe('Phone Input', () => {

    test('renders default country code when not provided', () => {
      render(
        <Input 
          type="phone" 
          label="Phone Number" 
        />
      );
      
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    test('renders UK flag when country code is +44', () => {
      render(
        <Input 
          type="phone" 
          label="Phone Number" 
          countryCode="+44" 
        />
      );
      
      // Check that some elements of the UK flag are present
      const flagElement = screen.getByText('+44').previousSibling;
      expect(flagElement).toHaveClass('w-6');
      expect(flagElement).toHaveClass('h-4');
      expect(flagElement).toHaveClass('bg-blue-600');
    });

  });

  // Date Range Input Tests
  describe('Date Range Input', () => {
    test('shows the arrow separator between date inputs', () => {
      render(
        <Input 
          type="dateRange" 
          label="Booking Period" 
        />
      );
      
      expect(screen.getByText('→')).toBeInTheDocument();
    });
});
});