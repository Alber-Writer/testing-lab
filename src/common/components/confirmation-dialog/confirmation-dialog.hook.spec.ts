import { act, renderHook, waitFor } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('useConfirmationDialog hook specs', () => {
  it('Should return an object containing: default values (isOpen, itemToDelete), and functions:(onAccept, onClose, onOpenDialog)', () => {
    // Arrange
    const expectedResult = {
      isOpen: false,
      itemToDelete: {
        id: '',
        name: '',
      },
      onAccept: () => {},
      onClose: () => {},
      onOpenDialog: () => {},
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(expectedResult.isOpen);
    expect(result.current.itemToDelete).toEqual(expectedResult.itemToDelete);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('Should update isOpen to true, when onOpenDialog is invoked with an item', () => {
    // Arrange
    const itemToDelete: Lookup = {
      id: '',
      name: '',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
  });

  it('Should update isOpen to false, when onClose is invoked', () => {
    // Arrange
    const itemToDelete: Lookup = {
      id: '',
      name: '',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    // Previous Action
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    expect(result.current.isOpen).toEqual(true);

    // Second Action
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('Should update itemToDelete with an emptyLookup, when onAccept is invoked', () => {
    // Arrange
    const expectedResult: Lookup = {
      id: '',
      name: '',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(expectedResult);
  });

  it('Should update itemToDelete with the item provided, when onOpenDialog is invoked', () => {
    // Arrange
    const newItemToDelete: Lookup = {
      id: '1',
      name: 'Pepe',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(newItemToDelete);
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(newItemToDelete);
  });

});
