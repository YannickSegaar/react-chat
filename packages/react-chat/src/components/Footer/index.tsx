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
  userId: string; // Add userId here
}

const Footer: React.FC<FooterProps> = ({
  withWatermark,
  hasEnded,
  disableSend,
  onStart,
  onSend,
  audioInterface,
  speechRecognition,
  userId, // Add userId here
}) => {
  const [message, setMessage] = useState('');

  const handleSend = async (): Promise<void> => {
    if (!message || disableSend) return;

    setMessage('');
    await onSend?.(message);
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
            {/* Pass userId to MainMenuButton */}
            <MainMenuButton userId={userId} />
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
