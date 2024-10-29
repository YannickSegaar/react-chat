import { styled } from '@/styles';

export const StatusContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  fontFamily: '"Open Sans", sans-serif',
  color: '#4caf50', // Green color for "online" status
  padding: '4px 8px',
  borderRadius: '12px',
  backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green background
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.15)', // Slightly darker on hover
  }
});

export const StatusDot = styled('div', {
  width: '8px',
  height: '8px',
  backgroundColor: '#4caf50',
  borderRadius: '50%',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    opacity: 0.5,
  },

  '@keyframes pulse': {
    '0%': { 
      transform: 'scale(1)',
      opacity: 0.5 
    },
    '50%': { 
      transform: 'scale(1.5)',
      opacity: 0 
    },
    '100%': { 
      transform: 'scale(1)',
      opacity: 0.5 
    },
  },
});