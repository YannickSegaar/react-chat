import React from 'react';
import { Overlay, Container, Content, Actions } from './styled';
import Button from '@/components/Button';
import { styled } from '@/styles';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  message: string;
  selectedAction: string | null;
  noBorderColor?: string;
  noBorderWidth?: string;
}

const StyledActions = styled(Actions, {
  '--no-button-border-color': 'var(--border-color)',
  '--no-button-border-width': 'var(--border-width)',
});

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onAccept,
  onCancel,
  message,
  selectedAction,
  noBorderColor = '#333',
  noBorderWidth = '1px',
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Container>
        <Content>
          <p>{message}</p>
        </Content>
        <StyledActions
          style={{
            '--border-color': noBorderColor,
            '--border-width': noBorderWidth,
          } as React.CSSProperties}
        >
          <Button.Primary onClick={onAccept}>Yes</Button.Primary>
          <Button type="subtle" onClick={onCancel}>No</Button>
        </StyledActions>
      </Container>
    </Overlay>
  );
};

export default ConfirmationDialog;