import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSquareMinus,
  faSquarePlus,
  faRightFromBracket,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

import { IconSvgProps } from '@/types';

export const Logo: FC<IconSvgProps> = ({ size = 36, height, ...props }) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || height}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />;
export const ExpandAllIcon = () => <FontAwesomeIcon icon={faSquarePlus} />;
export const CollapseAllIcon = () => <FontAwesomeIcon icon={faSquareMinus} />;
export const LogOutIcon = () => <FontAwesomeIcon icon={faRightFromBracket} />;
export const UserSettingsIcon = () => <FontAwesomeIcon icon={faUserGear} />;
