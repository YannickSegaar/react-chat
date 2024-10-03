import Button from '@/components/Button';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.MODAL);

export const Overlay = styled(tag('div', 'overlay'), {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000, // Ensure it is above other elements
});

export const Container = styled(tag('div', 'container'), {
  padding: '$4 $4 $3 $4',
  borderRadius: '$1',
  backgroundColor: '$white',
  boxShadow: '0 12px 48px 4px $shadow12',
  width: '90%', // Default width for responsiveness
  maxWidth: '500px', // Set a maximum width for the modal

  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const Content = styled(tag('div', 'content'), {
  paddingBottom: '$3',
  color: '$black',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Actions = styled(tag('div', 'actions'), {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '$3',

  [`& ${Button.Container}`]: {
    flex: 1,
    marginLeft: '$2',

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
});
