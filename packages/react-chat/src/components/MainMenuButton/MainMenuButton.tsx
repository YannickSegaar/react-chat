import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { triggerWorkflow } from '@/utils/triggerWorkflow'; // Import the new function

interface MainMenuButtonProps {
  userId: string; // This is necessary for identifying the user
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ userId }) => {
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

  const handleConfirm = async () => {
    if (selectedAction) {
      // Convert the selected action to a workflow ID and call the triggerWorkflow function
      let workflowId: string;
      switch (selectedAction) {
        case 'exploreTours':
          workflowId = process.env.EXPLORE_TOURS_WORKFLOW_ID ?? ''; // Replace with your actual workflow ID
          break;
        case 'viewBookings':
          workflowId = process.env.VIEW_BOOKINGS_WORKFLOW_ID ?? ''; // Replace with your actual workflow ID
          break;
        case 'contactSupport':
          workflowId = process.env.CONTACT_SUPPORT_WORKFLOW_ID ?? ''; // Replace with your actual workflow ID
          break;
        default:
          return;
      }

      if (!workflowId) {
        console.error(`Workflow ID for ${selectedAction} is not defined.`);
        return;
      }

      try {
        await triggerWorkflow(workflowId, userId);
        console.log(`Triggered workflow: ${workflowId}`);
      } catch (error) {
        console.error(`Error triggering workflow ${workflowId}`, error);
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
          message={`Do you want to proceed with ${selectedAction?.replace('WORKFLOW_', '').replace('_', ' ')}?`}
        />
      )}
    </>
  );
};

export default MainMenuButton;
