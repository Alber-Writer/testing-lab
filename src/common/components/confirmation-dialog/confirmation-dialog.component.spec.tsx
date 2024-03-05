import React from 'react';
import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent specs', () => {
  it('Should render a dialog containing provided data (title, text and button-labels) when prop -isOpen = true-', () => {
    // Arrange
    const mockOnClose = jest.fn();
    const mockOnAccept = jest.fn();

    const mockProps = {
      isOpen: true,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <div>Dialog text</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...mockProps} />);

    const dialog = screen.getByRole('dialog');
    const title = within(dialog).getByRole('heading', { name: /Test Title/i });
    const bodyText = within(dialog).getByText('Dialog text');
    const acceptBtn = within(dialog).getByRole('button', { name: /Accept/i });
    const closeBtn = within(dialog).getByRole('button', { name: /Close/i });

    // Assert
    expect(dialog).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
    expect(acceptBtn).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });

  it('Should not render a dialog when prop -isOpen = false-', () => {
    // Arrange
    const mockOnClose = jest.fn();
    const mockOnAccept = jest.fn();

    const mockProps = {
      isOpen: false,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <div>Dialog text</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...mockProps} />);
    const dialog = screen.queryByRole('dialog');

    // Assert
    expect(dialog).not.toBeInTheDocument();
  });

  it('Should handle close button click', async () => {
    // Arrange
    const mockOnClose = jest.fn();
    const mockOnAccept = jest.fn();

    const mockProps = {
      isOpen: true,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <div>Dialog text</div>,
    };
    // Act
    render(<ConfirmationDialogComponent {...mockProps} />);
    const dialog = screen.queryByRole('dialog');
    const closeBtn = within(dialog).getByRole('button', { name: /Close/i });
    await userEvent.click(closeBtn);

    // Assert
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('It should handle accept when click on Accept button', async () => {
    // Arrange
    const mockOnClose = jest.fn();
    const mockOnAccept = jest.fn();

    const mockProps = {
      isOpen: true,
      onAccept: mockOnAccept,
      onClose: mockOnClose,
      title: 'Test Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <div>Dialog text</div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...mockProps} />);
    const dialog = screen.queryByRole('dialog');
    const acceptBtn = within(dialog).getByRole('button', { name: /Accept/i });
    await userEvent.click(acceptBtn);

    // Assert
    expect(mockOnClose).toHaveBeenCalled();
  });
});
