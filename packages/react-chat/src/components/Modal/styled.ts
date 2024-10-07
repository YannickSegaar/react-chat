import Button from '@/components/Button';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.MODAL);

export const Overlay = styled(tag('div', 'overlay'), {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker semi-transparent background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000, // Ensure it is above other elements
});

export const Container = styled(tag('div', 'container'), {
  padding: '16px', // Adjust padding for better appearance
  borderRadius: '8px', // More rounded corners
  backgroundColor: '#fff', // White background for the modal
  boxShadow: '0 12px 48px 4px rgba(0, 0, 0, 0.2)',
  width: '90%', // Responsive width
  maxWidth: '500px', // Set a maximum width for the modal
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  alignItems: 'center',
});

export const Content = styled(tag('div', 'content'), {
  paddingBottom: '16px',
  color: '#000', // Black text color
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Actions = styled(tag('div', 'actions'), {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',

  [`& ${Button.Container}`]: {
    flex: 1,
    marginLeft: '8px',

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
});