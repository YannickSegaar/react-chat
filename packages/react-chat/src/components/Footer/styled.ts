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

  // Adds spacing between the MainMenuButton and other elements
  '& > *:not(:last-child)': {
    marginRight: '10px', // Adjust this value as needed for desired spacing
  },

  variants: {
    withShadow: {
      true: {
        boxShadow: '0 12px 48px $shadow16',
      },
    },
    withWatermark: {
      true: {
        paddingBottom: '0',
      },
    },
  },
});

// Adding styles for the Watermark (existing styling)
export const Watermark = styled(tag('aside', 'watermark'), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0 $3 0',
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
});
