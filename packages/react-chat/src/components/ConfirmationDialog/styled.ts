import { styled } from '@/styles'; // Keep using the project-specific styling utility
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import Button from '@/components/Button';

const tag = tagFactory(ClassName.MODAL);

export const Overlay = styled(tag('div', 'overlay'), {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background to cover the rest of the page
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Container = styled(tag('div', 'container'), {
  width: '70%',
  maxWidth: '400px', // Limit the width to a maximum of 400px
  padding: '$4',
  borderRadius: '$1',
  backgroundColor: '$white',
  boxShadow: '0 12px 48px 4px $shadow12',
  zIndex: 1100, // Should be on top of the overlay
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Content = styled(tag('div', 'content'), {
  marginBottom: '$3',
  textAlign: 'center',
  color: '$black',
  typo: { size: 16, height: '22px' }, // Adjusted typography for readability
});

export const Actions = styled(tag('div', 'actions'), {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  gap: '12px',

  [`& ${Button.Container}`]: {
    flex: 1,
    padding: '12px 0',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: '8px',

    '&:first-of-type': {
      backgroundColor: '#0f2f5c',
      color: '#fff',
    },
    '&:last-of-type': {
      backgroundColor: '#f0f0f0',
      color: '#333',
      border: 'var(--no-button-border-width, 1px) solid var(--no-button-border-color, #333)',
    },
  },
});