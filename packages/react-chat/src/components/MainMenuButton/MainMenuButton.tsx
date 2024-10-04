import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon';
import ConfirmationDialog from '@/components/ConfirmationDialog';

// Define the prop types for MainMenuButton
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
      sendCustomActionTrace(selectedAction); // This sends the custom action trace
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedAction(null);
  };

  // Function to send custom action trace
  const sendCustomActionTrace = (action: string) => {
    const customTrace = {
      type: 'customAction', // Ensure this matches your Voiceflow custom action type
      payload: {
        action, // This is the action identifier, e.g., 'exploreTours'
        status: 'success', // Include this to indicate confirmation
      },
    };

    if (window.voiceflow && window.voiceflow.chat) {
      window.voiceflow.chat.interact(customTrace); // Directly pass the trace object here
    } else {
      console.error('Voiceflow Web Chat API is not available.');
    }
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
          message={`Do you want to explore ${selectedAction}?`}
        />
      )}
    </>
  );
};

export default MainMenuButton;
