import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface MainMenuButtonProps {
  onActionSelect: (action: string) => void;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ onActionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (selectedAction) {
      const tracePayload = {
        type: 'custom_trace',
        payload: {
          customData: selectedAction
        }
      };

      console.log('Sending custom trace:', tracePayload);

      if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
        window.voiceflow.chat.interact(tracePayload);
      } else {
        console.error('Voiceflow chat is not properly initialized');
      }
      onActionSelect(selectedAction);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedAction(null);
  };

  return (
    <>
      <MainMenuButtonContainer>
        <Icon
          svg="plusCircle"
          onClick={handleMenuToggle}
          css={{ cursor: 'pointer', width: '24px', height: '24px' }}
        />
        {isOpen && (
          <DropUpMenu>
            <button onClick={() => handleActionClick('exploreTours')}>Explore Tours</button>
            <button onClick={() => handleActionClick('viewBookings')}>View Bookings</button>
            <button onClick={() => handleActionClick('contactSupport')}>Contact Support</button>
          </DropUpMenu>
        )}
      </MainMenuButtonContainer>
      {isDialogOpen && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onAccept={handleConfirm}
          onCancel={handleCancel}
          message={`Do you want to ${selectedAction}?`}
        />
      )}
    </>
  );
};

export default MainMenuButton;