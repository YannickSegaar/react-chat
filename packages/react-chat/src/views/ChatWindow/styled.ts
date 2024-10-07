import Chat from '@/components/Chat';
import { styled } from '@/styles';

export const ChatWindowContainer = styled('div', {
  height: '100%',
  position: 'relative',

  [`& ${Chat.Container}`]: {
    height: '100%',
  },
});

export const DialogOverlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,

  variants: {
    isOpen: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
});