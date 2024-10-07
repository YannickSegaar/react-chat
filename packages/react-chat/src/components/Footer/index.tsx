import React, { useState, useEffect } from 'react';
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
  onActionSelect: (action: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  withWatermark,
  hasEnded,
  disableSend,
  onStart,
  onSend,
  audioInterface,
  speechRecognition,
  onActionSelect,
}) => {
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const tooltipShown = localStorage.getItem('tooltipShown');
    if (!tooltipShown) {
      setShowTooltip(true);
    }
  }, []);

  const handleSend = async (message: string): Promise<void> => {
    if (!message || disableSend) return;
    await onSend?.(message);
  };

  const handleTooltipDismiss = () => {
    setShowTooltip(false);
    localStorage.setItem('tooltipShown', 'true');
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
            <MainMenuButton
              onActionSelect={onActionSelect}
              showTooltip={showTooltip}
              onTooltipDismiss={handleTooltipDismiss}
            />
            <InputWrapper>
              <ChatInput
                value={message}
                placeholder="Message…"
                autoFocus
                onValueChange={setMessage}
                onSend={() => handleSend(message)}
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