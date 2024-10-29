// components/Launcher/styled.ts
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.LAUNCHER);

export const LauncherContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', // Ensures alignment to the right
});

export const Button = styled(tag('button'), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$round',
  backgroundColor: '$primary',
  trans: ['background-color', 'box-shadow'],

  height: '$xl',
  width: '$xl',
  border: '1px solid $shadow4',
  boxShadow: '0 1px 6px $shadow6, 0 2px 24px $shadow8',

  '&:focus': {
    outline: 0,
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$darkPrimary',
  },

  '& > img': {
    width: '$sm',
    height: '$sm',
  },

  padding: 0,
  margin: 0,
});

export const LauncherStatus = styled('div', {
  position: 'absolute',
  right: '100%', // Positions it to the left of the launcher button
  marginRight: '12px', // Adds some space between the status and the button
  whiteSpace: 'nowrap', // Prevents text wrapping
});