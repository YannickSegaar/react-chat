import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
`;

export const TooltipContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  max-width: 300px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const TooltipContent = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
`;

export const TooltipButton = styled.button`
  background-color: #3d82e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2f75d6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(61, 130, 226, 0.5);
  }
`;