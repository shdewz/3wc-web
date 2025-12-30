import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSquareMinus,
  faSquarePlus,
  faRightFromBracket,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import { IconSvgProps } from '@/types';

export const Logo: FC<IconSvgProps> = ({
  size = 28,
  height,
  color = 'currentColor',
  ...props
}) => {
  const side = height ?? size;

  return (
    <svg
      aria-label="App logo"
      fill="none"
      height={side}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      viewBox="0 0 216 188"
      width={side}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M157.067 102.07L216 0H0L58.9334 102.07L108 17.0808L157.067 102.07Z"
        fill={color}
      />
      <path d="M108 187.06L132.216 145.118H83.7839L108 187.06Z" fill={color} />
      <path
        d="M64.9835 112.556L77.7285 134.633H138.271L151.016 112.556L108 38.0517L64.9835 112.556Z"
        fill={color}
      />
      <path
        d="M157.067 102.07L151.016 112.556L163.762 134.633H138.271L132.216 145.118H181.922L157.067 102.07Z"
        fill={color}
      />
      <path
        d="M52.2384 134.633L64.9835 112.556L58.9334 102.07L34.0777 145.118H83.7839L77.7285 134.633H52.2384Z"
        fill={color}
      />
    </svg>
  );
};

export const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />;
export const ExpandAllIcon = () => <FontAwesomeIcon icon={faSquarePlus} />;
export const CollapseAllIcon = () => <FontAwesomeIcon icon={faSquareMinus} />;
export const LogOutIcon = () => <FontAwesomeIcon icon={faRightFromBracket} />;
export const UserSettingsIcon = () => <FontAwesomeIcon icon={faUserGear} />;
export const DiscordIcon = () => <FontAwesomeIcon icon={faDiscord} />;
