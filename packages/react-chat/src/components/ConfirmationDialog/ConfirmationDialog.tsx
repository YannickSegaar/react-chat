import React from 'react';
import { Overlay, Container, Content, Actions } from './styled';
import Button from '@/components/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onAccept, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Container>
        <Content>
          <p>{message}</p> {/* Displaying the message to the user */}
        </Content>
        <Actions>
          <Button.Primary onClick={onAccept}>Yes</Button.Primary>
          <Button type="subtle" onClick={onCancel}>No</Button>
        </Actions>
      </Container>
    </Overlay>
  );
};

export default ConfirmationDialog;
