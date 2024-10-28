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
    backgroundColor: 'rgba(230, 230, 230, 1)', // Change last value for opacity
    border: '1px solid #C8C8C8',
    borderRadius: '$1',
    boxShadow: '0 1px 6px $shadow6',
    padding: '8px 0',
    minWidth: 150,
    width: 'max-content',
    maxWidth: 300,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
  
    '& button': {
      background: 'none',
      border: 'none',
      borderBottom: '1px solid #C8C8C8', // Subtle divider line between options
      padding: '8px 16px',
      textAlign: 'left',
      cursor: 'pointer',
      color: '$black',
      whiteSpace: 'nowrap',
      width: '100%',
  
      '&:last-child': {
        borderBottom: 'none', // Remove border from last item
      },
  
      '&:hover': {
        backgroundColor: '#EBEBEB', // Slightly darker grey for hover state
      },
    },
  });