import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
//To avoid jest-and-babel known issues, we import directly the module below
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('common/components/spinner/spinner.component.tsx specs', () => {
  it('Should not render a modal when usePromiseTracker returns promiseInProgress:false', () => {
    // Arrange
    const getStub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });

    // Act
    render(<SpinnerComponent />);
    const modal = screen.queryByRole('presentation');

    // Assert
    expect(getStub).toHaveBeenCalled();
    expect(modal).not.toBeInTheDocument();
  });

  it('Should render modal and loader when usePromiseTracker returns promiseInProgress:true', () => {
    // Arrange
    const getStub = jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });

    // Act
    render(<SpinnerComponent />);
    const modal = screen.queryByRole('presentation');
    const loader = within(modal).queryByRole('loader');

    // Assert
    expect(getStub).toHaveBeenCalled();
    expect(modal).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
