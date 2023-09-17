import React from 'react';
import { MenuPluseIcon, MenuMinusIcon, MenuEditIcon, MenuDeleteIcon } from '../../IconCompomemts';
import { EColor } from '../../Utils/enums';

export enum EIcons {
  MenuPluseIcon = 'MenuPluseIcon',
  MenuMinusIcon = 'MenuMinusIcon',
  MenuEditIcon = 'MenuEditIcon',
  MenuDeleteIcon = 'MenuDeleteIcon',
}

interface IProps {
  name?: EIcons;
  color?: EColor;
}

export function Icon({ name, color =  EColor.greenlight }: IProps) {
  switch (name) {
    case 'MenuPluseIcon':
      return <MenuPluseIcon color={color}/>;
    case 'MenuMinusIcon':
      return <MenuMinusIcon color={color}/>;
    case 'MenuEditIcon':
      return <MenuEditIcon color={color}/>;
    case 'MenuDeleteIcon':
      return <MenuDeleteIcon color={color}/>;
    default:
      return <></>;
  }
}
