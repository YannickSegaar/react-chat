import Button from '@/components/Button';
import Input from '@/components/Input';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.FOOTER);

export const Container = styled(tag('footer'), {
  display: 'flex',
  alignItems: 'center',
  padding: '$3 $4 $4 $4',
  borderRadius: '$1',

  // Ensures the input container expands to take up the available space
  [`& ${Input.Container}`]: {
    flex: 1,
  },

  // Styling for buttons in the container (e.g., "Start New Chat" button)
  [`& ${Button.Container}`]: {
    width: '100%',
  },

  variants: {
    withShadow: {
      true: {
        boxShadow: '0 12px 48px $shadow16',
      },
    },
  },
});

// Adding styles for the Watermark (existing styling)
export const Watermark = styled(tag('aside', 'watermark'), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 0', // Adjust padding as needed
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

// Wrapper for the MainMenuButton to control its styling
export const MainMenuButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px', // Adjust this value if needed to properly align with ChatInput
  flexShrink: 0, // Prevent shrinking of the button
});

// Wrapper for ChatInput and Watermark to align vertically
export const InputWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1, // Allows the entire wrapper to take up remaining space
});
