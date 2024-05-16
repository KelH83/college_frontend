import { render, screen } from '@testing-library/react'
import Header from './components/Header'
import Footer from './components/Footer'
import React from 'react';

describe("Header component", () => {
    it("Displays header text and image", () => {
      render(<Header />);
      const headerMessage = screen.getByText(/student records/i)
      const headerImg = screen.getByRole('img', { name: 'school logo' })
      expect(headerMessage).toBeVisible();
      expect(headerImg).toBeVisible();
    })
  })

  describe("Footer component", () => {
    const date = new Date();
    const year = date.getFullYear();
    it("Displays footer text", () => {
        render(<Footer />);
        const footerMessage = screen.getByText(/copyright wilson college/i)
        const footerYear = screen.getByText(year)
        expect(footerMessage).toBeVisible();
        expect(footerYear).toBeVisible();
    })
  })