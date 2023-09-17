import React from 'react';
import { RootState } from '../../stor/stor';
import { useSelector } from 'react-redux';

interface IProps {
  children?: React.ReactNode;
}

export function Tmpl({ children }: IProps) {
  const tmpl = useSelector<RootState, boolean>(state => state.tmpl);
  console.log(tmpl);

  return (
    <div className={tmpl ? 'blaskTmpl' : 'whiteTmpl'}>
      {children}
    </div>
  );
}
