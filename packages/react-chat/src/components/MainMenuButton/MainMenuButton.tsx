import React, { useState } from 'react';
import { MainMenuButtonContainer, DropUpMenu } from './styled';
import Icon from '@/components/Icon';
import Tooltip from '@/components/Tooltip';

interface MainMenuButtonProps {
  onActionSelect: (action: string) => void;
  showTooltip: boolean;
  onTooltipDismiss: () => void;
}

const MainMenuButton: React.FC<MainMenuButtonProps> = ({ onActionSelect, showTooltip, onTooltipDismiss }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions = [
    'MainMenu_Intent_A',
    'MainMenu_Intent_B',
    'MainMenu_Intent_C',
    'MainMenu_Intent_D',
    'MainMenu_Intent_E',
    'MainMenu_Intent_F',
    'MainMenu_Intent_G',
    'MainMenu_Intent_H',
    'MainMenu_Intent_I',
    'MainMenu_Intent_J'
  ];

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    onActionSelect(action);
  };

  console.log('MainMenuButton rendering, showTooltip:', showTooltip);

  return (
    <MainMenuButtonContainer>
      <Icon
        svg="plusCircle"
        onClick={handleMenuToggle}
        css={{ cursor: 'pointer', width: '24px', height: '24px' }}
      />
      {showTooltip && (
        <Tooltip
          label="Got it!"
          onClick={onTooltipDismiss}
        >
          Use the main menu to navigate through different options
        </Tooltip>
      )}
      {isOpen && (
        <DropUpMenu>
          {menuOptions.map((option) => (
            <button key={option} onClick={() => handleActionClick(option)}>
              {option}
            </button>
          ))}
        </DropUpMenu>
      )}
    </MainMenuButtonContainer>
  );
};

export default MainMenuButton;