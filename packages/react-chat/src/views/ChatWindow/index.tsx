import '../../styles.css';

import React, { useCallback, useContext, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Chat, SystemResponse, UserResponse } from '@/components';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

import { ChatWindowContainer, DialogOverlay } from './styled';

export interface ChatWindowProps {
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant, config } = runtime;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const closeAndEnd = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.close();
  }, [runtime]);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  const triggerIntent = (action: string) => {
    const tracePayload = {
      type: 'intent',
      payload: {
        intent: {
          name: action
        }
      }
    };

    if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
      window.voiceflow.chat.interact(tracePayload);
    } else {
      console.error('Voiceflow chat is not properly initialized');
    }
  };

  const handleConfirm = () => {
    if (selectedAction) {
      triggerIntent(selectedAction);
    }
    setIsDialogOpen(false);
    setSelectedAction(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedAction(null);
  };

  return (
    <ChatWindowContainer className={className}>
      <Chat
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        avatar={assistant.avatar}
        withWatermark={assistant.watermark}
        startTime={state.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={runtime.isStatus(SessionStatus.IDLE) && state.session.turns.length === 0 && config.autostart}
        onStart={runtime.launch}
        onEnd={closeAndEnd}
        onSend={runtime.reply}
        onMinimize={runtime.close}
        audioInterface={assistant.audioInterface}
        onActionSelect={handleActionSelect}
      >
        {state.session.turns.map((turn, turnIndex) =>
          match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                feedback={
                  assistant.feedback
                    ? {
                        onClick: (feedback: FeedbackName) => {
                          runtime.feedback(feedback, props.messages, getPreviousUserTurn(turnIndex));
                        },
                      }
                    : undefined
                }
                avatar={assistant.avatar}
                isLast={turnIndex === state.session.turns.length - 1}
              />
            ))
            .exhaustive()
        )}
        {state.indicator && <SystemResponse.Indicator avatar={assistant.avatar} />}
      </Chat>
      <DialogOverlay isOpen={isDialogOpen}>
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onAccept={handleConfirm}
          onCancel={handleCancel}
          message={`Do you want to trigger ${selectedAction}?`}
          selectedAction={selectedAction}
        />
      </DialogOverlay>
    </ChatWindowContainer>
  );
};

export default Object.assign(ChatWindow, { Container: ChatWindowContainer });