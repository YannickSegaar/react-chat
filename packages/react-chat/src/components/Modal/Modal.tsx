import React from 'react';
import { Container, Overlay, Content, Actions } from './styled';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <Content>{children}</Content>
        <Actions>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </Actions>
      </Container>
    </Overlay>
  );
};

export default Modal;
