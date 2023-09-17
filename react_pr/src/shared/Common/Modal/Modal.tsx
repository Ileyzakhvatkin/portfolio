import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.css';
import { ModalClose } from '../../IconCompomemts/ModalClose';

interface IProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function Modal(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Чтобы работало из меню!!!
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, ref: React.RefObject<HTMLDivElement>) {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      props.onClose?.();
    }
  }

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modalBg} onClick={(event) => handleClick(event, ref)}>
      <div className={styles.modal} ref={ref}>
        <div className={styles.contentModal}>
          <div className={styles.closeModal} onClick={() => props.onClose?.()}><ModalClose/></div>
          { props.children }
        </div>
      </div>
    </div>

  ), node);
}
