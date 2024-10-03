import React from 'react';
import Prompt, { PromptOptionProps } from '@/components/Prompt';

interface ConfirmationDialogProps {
  /**
   * The option that the user selected.
   */
  selectedOption: string;

  /**
   * Function to call when the user confirms.
   */
  onConfirm: () => void;

  /**
   * Function to call when the user cancels.
   */
  onCancel: () => void;

  /**
   * Boolean to show or hide the dialog.
   */
  show: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ selectedOption, onConfirm, onCancel, show }) => {
  if (!show) return null;

  // Use the selected option to generate a more meaningful confirmation message.
  const message = `Would you like to continue to ${selectedOption.toLowerCase()}?`;

  const accept: PromptOptionProps = {
    label: 'Yes',
    onClick: onConfirm,
  };

  const cancel: PromptOptionProps = {
    label: 'No',
    onClick: onCancel,
    type: 'subtle',
  };

  return (
    <Prompt accept={accept} cancel={cancel}>
      <p>{message}</p>
    </Prompt>
  );
};

export default ConfirmationDialog;
