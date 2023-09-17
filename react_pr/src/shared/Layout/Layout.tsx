import React from 'react';
import styles from './layout.css';

interface ILayoutProps {
  children?: React.ReactNode;
}

// Если используем children не нужно жестко привязывать импорты компонент!!!!
export function Layout({ children }: ILayoutProps): JSX.Element {

  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}
