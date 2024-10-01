import { styled } from '@/styles'; // Keep using the project-specific styling utility

export const MainMenuButtonContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const MenuButton = styled('button', {
  backgroundColor: '$primary', // Match the main theme color
  borderRadius: '50%',
  border: 'none',
  width: 36,
  height: 36,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: 10, // Spacing from the input
  boxShadow: '0 4px 16px 0 $shadow4, 0 0 0 1px $shadow2',

  '&:hover': {
    backgroundColor: '$darkPrimary',
  },
});

export const DropUpMenu = styled('div', {
  position: 'absolute',
  bottom: 50,
  left: 0,
  backgroundColor: '$white',
  borderRadius: '$1',
  boxShadow: '0 1px 6px $shadow6',
  padding: '8px 0',
  width: 150,
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',

  '& button': {
    background: 'none',
    border: 'none',
    padding: '8px 16px',
    textAlign: 'left',
    cursor: 'pointer',
    color: '$black',

    '&:hover': {
      backgroundColor: '$lightGrey',
    },
  },
});
