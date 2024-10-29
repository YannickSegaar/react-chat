import React from 'react';
import { StatusContainer, StatusDot } from './styled';

interface StatusIndicatorProps {
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ className }) => (
  <StatusContainer className={className}>
    <StatusDot />
    <span>Online Now</span>
  </StatusContainer>
);

export default StatusIndicator;