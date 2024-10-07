import React, { useRef, useEffect } from 'react';
import { DismissableLayerProvider, useDismissable } from 'react-dismissable-layers';
import { TooltipContainer, TooltipContent, TooltipButton } from './styled';

interface DismissableTooltipProps {
  isOpen: boolean;
  onClose: () => void;
}

const DismissableTooltip: React.FC<DismissableTooltipProps> = ({ isOpen, onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [, , forceClose] = useDismissable(isOpen, { ref: tooltipRef, onClose });

  useEffect(() => {
    console.log('DismissableTooltip rendered, isOpen:', isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DismissableLayerProvider>
      <TooltipContainer ref={tooltipRef}>
        <TooltipContent>
          Use the main menu to navigate through different options
        </TooltipContent>
        <TooltipButton onClick={forceClose}>Got it!</TooltipButton>
      </TooltipContainer>
    </DismissableLayerProvider>
  );
};

export default DismissableTooltip;