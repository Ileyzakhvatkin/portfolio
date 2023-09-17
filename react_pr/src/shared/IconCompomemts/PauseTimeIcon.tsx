import * as React from 'react';
import { IIconProps } from '../Utils/enums';

export function PauseTimeIcon({color}: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 129 129" fill="none">
      <path stroke={`var(--${color})`} d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path stroke={`var(--${color})`} d="M64.3154 37.1579V64.3158L77.8944 77.8947" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
