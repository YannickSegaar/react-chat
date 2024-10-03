import { styled } from '@/styles'; // Keep using the project-specific styling utility

export const MainMenuButtonContainer = styled('div', {
    position: 'relative',
    display: 'flex',
    alignItems: 'center', // Ensures the MainMenuButton is aligned vertically with other elements
    justifyContent: 'center',
    marginRight: '12px', // Adjust the spacing between the MainMenuButton and the ChatInput container to prevent collision
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
