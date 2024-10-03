import { useState } from 'react';
import Button from '@/components/Button';
import ChatInput from '@/components/ChatInput';
import MainMenuButton from '@/components/MainMenuButton';
import { Container, Watermark, InteractionWrapper, InputWrapper, StartNewChatWrapper, FullWidthButtonWrapper } from './styled';

export interface FooterProps {
  withWatermark: boolean;
  hasEnded?: boolean;
  disableSend?: boolean;
  audioInterface?: boolean;
  onStart?: (() => Promise<void>) | undefined;
  onSend?: ((message: string) => Promise<void>) | undefined;
  speechRecognition?: any;
}

const Footer: React.FC<FooterProps> = ({
  withWatermark,
  hasEnded,
  disableSend,
  onStart,
  onSend,
  audioInterface,
  speechRecognition,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = async (): Promise<void> => {
    if (!message || disableSend) return;

    setMessage('');
    await onSend?.(message);
  };

  const handleMenuActionSelect = (action: string) => {
    switch (action) {
      case 'exploreTours':
        // Trigger the workflow for Explore Tours using a custom identifier
        triggerWorkflow('EXPLORE_TOURS');
        break;
      case 'viewBookings':
        triggerWorkflow('VIEW_BOOKINGS');
        break;
      case 'contactSupport':
        triggerWorkflow('CONTACT_SUPPORT');
        break;
      default:
        break;
    }
  };
  
  // Add a new function to handle workflow triggering
  const triggerWorkflow = (workflowId: string) => {
    // Implement a function that interacts with the Voiceflow API or runtime context
    onSend?.(`/workflow ${workflowId}`);
  };

  return (
    <Container>
      {hasEnded ? (
        <StartNewChatWrapper>
          <FullWidthButtonWrapper>
            <Button onClick={onStart}>Start New Chat</Button>
          </FullWidthButtonWrapper>
          {withWatermark && (
            <Watermark>
              Assistant ⚡️ by
              <a target="_blank" href="https://www.romaix.ai/" rel="noreferrer">
                RomAIx
              </a>
            </Watermark>
          )}
        </StartNewChatWrapper>
      ) : (
        <>
          <InteractionWrapper>
            <MainMenuButton onActionSelect={handleMenuActionSelect} />
            <InputWrapper>
              <ChatInput
                value={message}
                placeholder="Message…"
                autoFocus
                onValueChange={setMessage}
                onSend={handleSend}
                disableSend={disableSend}
                audioInterface={audioInterface}
                speechRecognition={speechRecognition}
              />
            </InputWrapper>
          </InteractionWrapper>
          {withWatermark && (
            <Watermark>
              Assistant ⚡️ by
              <a target="_blank" href="https://www.romaix.ai/" rel="noreferrer">
                RomAIx
              </a>
            </Watermark>
          )}
        </>
      )}
    </Container>
  );
};

export default Footer;
