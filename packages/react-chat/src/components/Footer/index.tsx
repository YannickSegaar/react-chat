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
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    console.log('Footer component mounted');
    window.triggerMainMenuTooltip = () => {
      console.log('triggerMainMenuTooltip called');
      // Remove the localStorage check for testing
      console.log('Setting showTooltip to true');
      setShowTooltip(true);
    };

    return () => {
      if (window.triggerMainMenuTooltip) {
        delete window.triggerMainMenuTooltip;
      }
    };
  }, []);

  window.triggerMainMenuTooltip = (force = false) => {
    console.log('triggerMainMenuTooltip called, force:', force);
    const tooltipShown = localStorage.getItem('tooltipShown');
    console.log('tooltipShown in localStorage:', tooltipShown);
    if (!tooltipShown || force) {
      console.log('Setting showTooltip to true');
      setShowTooltip(true);
    }
  };

  const handleSend = async (message: string): Promise<void> => {
    if (!message || disableSend) return;
    await onSend?.(message);
  };

  const handleMenuActionSelect = (action: string) => {
    // Handle the action if needed
    console.log('Menu action selected:', action);
  };

  const handleTooltipDismiss = () => {
    console.log('Tooltip dismissed');
    setShowTooltip(false);
    localStorage.setItem('tooltipShown', 'true');
  };

  console.log('Rendering Footer, showTooltip:', showTooltip);

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
              onActionSelect={handleMenuActionSelect}
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