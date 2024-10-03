import { styled } from '@/styles';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import Button from '@/components/Button';
import Input from '@/components/Input';

// Define the tag for styling
const tag = tagFactory(ClassName.FOOTER);

// Styled Container for Footer
export const Container = styled(tag('footer'), {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '$3 $4',
  borderRadius: '$1',

  variants: {
    withShadow: {
      true: {
        boxShadow: '0 12px 48px $shadow16',
      },
    },
  },
});

export const InteractionWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: '$2',
});

export const InputWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  [`& ${Input.Container}`]: {
    width: '100%',
  },
});

export const StartNewChatWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`& ${Button}`]: {
    width: '100%',
    padding: '10px 0',
  },
});

export const FullWidthButtonWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',

  '& button': {
    width: '100%', // Ensure the button takes the full width of its wrapper
    padding: '10px 0', // Adjust padding as needed
  },
});

export const Watermark = styled(tag('aside', 'watermark'), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0',
  typo: { size: 12, height: '17px' },
  color: '$darkGrey',

  '& a': {
    marginLeft: '0.5ch',
    textDecoration: 'none',
    color: '$blue',

    '&:focus': {
      outline: 0,
    },
  },
});