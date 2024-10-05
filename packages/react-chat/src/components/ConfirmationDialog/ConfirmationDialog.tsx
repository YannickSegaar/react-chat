import React from 'react';
import { Overlay, Container, Content, Actions } from './styled';
import Button from '@/components/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  message: string;
  selectedAction: string | null;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onAccept, onCancel, message, selectedAction }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedAction) {
      const tracePayload = {
        type: 'intent',
        payload: {
          intent: {
            name: selectedAction
          }
        }
      };

      if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
        window.voiceflow.chat.interact(tracePayload);
      } else {
        console.error('Voiceflow chat is not properly initialized');
      }
    }
    onAccept();
  };

  return (
    <Overlay>
      <Container>
        <Content>
          <p>{message}</p>
        </Content>
        <Actions>
          <Button.Primary onClick={handleConfirm}>Yes</Button.Primary>
          <Button type="subtle" onClick={onCancel}>No</Button>
        </Actions>
      </Container>
    </Overlay>
  );
};

export default ConfirmationDialog;