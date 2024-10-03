import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon';
import ConfirmationDialog from '@/components/ConfirmationDialog'; // Import the ConfirmationDialog component
// import { RuntimeService } from '../../../../sdk-runtime/src/runtime/runtime.service';
import ConcreteRuntimeService from '../../../../sdk-runtime/src/runtime/ConcreteRuntimeService';



interface MainMenuButtonProps {
  onActionSelect: (action: string) => void;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ onActionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

// Access environment variables
const runtimeService = new ConcreteRuntimeService({
  url: process.env.REACT_APP_VOICEFLOW_RUNTIME_URL || '',
  verify: { authorization: process.env.REACT_APP_VOICEFLOW_AUTH_TOKEN || '' },
});


  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedAction) {
      try {
        // Trigger the custom action trace to Voiceflow
        if (selectedAction === 'exploreTours') {
          await runtimeService.sendCustomAction('YOUR_SESSION_ID', 'exploreTours');
        } else {
          // Handle other actions if needed, or call the callback function
          onActionSelect(selectedAction);
        }
      } catch (error) {
        console.error('Error sending custom action:', error);
      }
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
          message={`Do you want to explore ${selectedAction}?`}
        />
      )}
    </>
  );
};

export default MainMenuButton;
