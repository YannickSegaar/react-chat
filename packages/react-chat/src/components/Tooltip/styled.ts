import BaseButton from '@/components/Button';
import Message from '@/components/Message';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.TOOLTIP);

export const StyledButton = styled('button', {
  height: '32px',
  border: '1px solid #dfdfdf',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  color: '#007bff',
  marginTop: '10px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
});

export const TooltipContainer = styled('div', {
  position: 'fixed', // Make tooltip an overlay
  bottom: '80px', // Adjust to place it above the MainMenuButton, closer for linking visually
  left: '40px', // Adjust positioning as needed for alignment with MainMenuButton
  padding: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  zIndex: 100, // Ensure it appears above other elements
  display: 'flex',
  flexDirection: 'column',

  variants: {
    withAction: {
      true: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
});

export const BubbleArrow = styled('div', {
  position: 'absolute',
  bottom: '-10px', // Positions the arrow below the tooltip container
  left: 'calc(50% - 10px)', // Centers the arrow horizontally relative to the tooltip
  width: '20px',
  height: '20px',
  backgroundColor: '#fff',
  transform: 'rotate(45deg)', // Rotate to form an arrow shape
  boxShadow: '-1px 1px 3px rgba(0, 0, 0, 0.2)',
  zIndex: 99, // Ensure the arrow is layered properly between the tooltip and button
});
