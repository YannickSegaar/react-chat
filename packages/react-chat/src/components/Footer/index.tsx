import { useState } from 'react';
import Button from '@/components/Button';
import ChatInput from '@/components/ChatInput';
import MainMenuButton from '@/components/MainMenuButton'; // Import the MainMenuButton
import { Container, Watermark, MainMenuButtonWrapper, InputWrapper } from './styled';

export interface FooterProps {
  withWatermark: boolean;
  hasEnded?: boolean;
  disableSend?: boolean;
  audioInterface?: boolean;
  onStart?: (() => Promise<void>) | undefined;
  onSend?: ((message: string) => Promise<void>) | undefined;
  speechRecognition?: any; // Use correct type if available
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
        onSend?.('Explore Tours'); // Sends the selected action to Voiceflow
        break;
      case 'viewBookings':
        onSend?.('View Bookings');
        break;
      case 'contactSupport':
        onSend?.('Contact Support');
        break;
      default:
        break;
    }
  };

  return (
    <Container withShadow={!!hasEnded}>
      {hasEnded ? (
        <Button onClick={onStart}>Start New Chat</Button>
      ) : (
        <>
          <MainMenuButtonWrapper>
            <MainMenuButton onActionSelect={handleMenuActionSelect} />
          </MainMenuButtonWrapper>
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
            {withWatermark && (
              <Watermark>
                Assistant ⚡️ by
                <a target="_blank" href="https://www.romaix.ai/" rel="noreferrer">
                  RomAIx
                </a>
              </Watermark>
            )}
          </InputWrapper>
        </>
      )}
    </Container>
  );
};

export default Footer;
