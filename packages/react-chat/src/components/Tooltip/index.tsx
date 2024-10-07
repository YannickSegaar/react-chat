import Message from '@/components/Message';
import type { DebugMessageProps } from '../Message/DebugMessage';
import { StyledButton, TooltipContainer, BubbleArrow } from './styled';

export interface ActionMessageProps extends DebugMessageProps {
  /**
   * If provided, this will render an action button within the tooltip.
   */
  label?: string | undefined;

  /**
   * A callback handler for the action button.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ label, onClick, children, ...props }) => (
  <TooltipContainer withAction={!!label} id="tooltip-container" style={{ display: 'none' }}> {/* Turned off tooltip */}
    <BubbleArrow />
    <Message.Debug {...props}>{children}</Message.Debug>
    {label && <StyledButton onClick={onClick}>{label}</StyledButton>}
  </TooltipContainer>
);

/**
 * Renders a {@link Message.Debug} with an optional action.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-tooltip--left-orientation}
 */
export default Object.assign(ActionMessage, {
  Button: StyledButton,
  Container: TooltipContainer,
});

// JavaScript to trigger tooltip after chat window opens
export function triggerTooltip() {
  setTimeout(() => {
    const tooltip = document.getElementById('tooltip-container');
    if (tooltip) {
      tooltip.style.display = 'none'; // Turn off tooltip
    }
  }, 1000); // Adjust delay as needed
}

window.triggerMainMenuTooltip = function (force = false) {
  const tooltipElement = document.getElementById('tooltip-container');
  if (tooltipElement && (force || !tooltipElement.classList.contains('dismissed'))) {
    tooltipElement.style.display = 'none'; // Turn off tooltip
  }
};