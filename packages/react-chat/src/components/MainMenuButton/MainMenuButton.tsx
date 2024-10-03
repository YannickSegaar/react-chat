import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon'; // Import the Icon component for styling consistency

interface MainMenuButtonProps {
  onActionSelect: (action: string) => void;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ onActionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    onActionSelect(action);
  };

  return (
    <MainMenuButtonContainer>
      {/* Replace the button wrapper with Icon itself */}
      <Icon svg="plusCircle" onClick={handleMenuToggle} css={{ cursor: 'pointer', width: '24px', height: '24px' }} />
      {isOpen && (
        <DropUpMenu>
          <button onClick={() => handleActionClick('exploreTours')}>Explore Tours</button>
          <button onClick={() => handleActionClick('viewBookings')}>View Bookings</button>
          <button onClick={() => handleActionClick('contactSupport')}>Contact Support</button>
        </DropUpMenu>
      )}
    </MainMenuButtonContainer>
  );
};

export default MainMenuButton;
