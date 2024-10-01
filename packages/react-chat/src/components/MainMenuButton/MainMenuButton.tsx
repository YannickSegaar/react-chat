import React, { useState } from 'react';
import { MainMenuButtonContainer, MenuButton, DropUpMenu } from './styled'; // Import from styled.ts
import Icon from '@/components/Icon'; // Import the existing Icon component for styling consistency

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
      <MenuButton onClick={handleMenuToggle}>
        <Icon svg="minus" /> {/* Assuming you have an SVG for a "menu" icon */}
      </MenuButton>
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
