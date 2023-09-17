import React from 'react';

interface IItem {
  id: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}

interface IGenericListProp {
  list: IItem[];
}

const noop = () => {};

export function GenericList({list}: IGenericListProp) {
  // console.log(list);
  return (
    <>
    {list.map(({ As = 'div', text, onClick = noop, className, id, href }) => (
      <As
        className={className}
        onClick={() => onClick(id)}
        key={id}
        href={href}
      >
        {text}
      </As>
    ))}
    </>
  );
}
