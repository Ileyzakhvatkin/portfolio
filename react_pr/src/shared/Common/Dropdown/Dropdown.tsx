import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './dropdown.css';
import ReactDOM from 'react-dom';

interface IDropdownProps {
  button: ReactNode;
  node: Element | null;
  children: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({ button, node, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const [ isDropdownOpen, setIsDropdownopen ] = useState(isOpen);
  useEffect(() => {
    setIsDropdownopen(isOpen);
  }, [isOpen]);
  useEffect(() => {
    isDropdownOpen ? onOpen() : onClose();
  }, [isDropdownOpen]);
  const handkeOpen = () => { if (isOpen === undefined) setIsDropdownopen(!isDropdownOpen);}
  if (!node) return null;

  const ref = useRef<HTMLDivElement>(null);
  const refBtn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target) && !refBtn.current?.contains(event.target)) {
        setIsDropdownopen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  return ReactDOM.createPortal((
    <div className={styles.container}>
      <div onClick={handkeOpen} ref={refBtn}>
        { button }
      </div>
      { isDropdownOpen && (
        <div className={styles.listConteiner} ref={ref}>
          <div className={styles.list} onClick={() => setIsDropdownopen(false)}>
            { children }
          </div>
        </div>
      )}
    </div>
  ), node);
}
