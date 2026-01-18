import { FC, forwardRef } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSquareMinus,
  faSquarePlus,
  faRightFromBracket,
  faUserGear,
  faCircleInfo,
  IconDefinition,
  faLink,
  faLinkSlash,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faTwitch,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { IconSvgProps } from '@/types';

export const makeFaIcon = (def: IconDefinition) => {
  const comp = forwardRef<SVGSVGElement, Omit<FontAwesomeIconProps, 'icon'>>(
    function FAIcon(props, ref) {
      return <FontAwesomeIcon ref={ref} icon={def} {...props} />;
    }
  );

  comp.displayName = `FAIcon(${def.iconName})`;

  return comp;
};

export const Logo: FC<IconSvgProps> = ({
  size = 28,
  height,
  color = 'currentColor',
  ...props
}) => {
  const side = height ?? size;

  return (
    <svg
      aria-label="3WC Logo"
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

export const OsuIcon: FC<IconSvgProps> = ({
  size = 28,
  height,
  color = 'currentColor',
  ...props
}) => {
  const side = height ?? size;

  return (
    <svg
      aria-label="osu! Logo"
      fill="none"
      height={side}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      viewBox="0 0 300 300"
      width={side}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M75.13,181.42c-4.71,0-8.81-.77-12.29-2.3-3.48-1.53-6.36-3.66-8.64-6.4-2.28-2.73-4-5.93-5.16-9.59-1.16-3.66-1.74-7.63-1.74-11.89s.58-8.26,1.74-12.01c1.16-3.74,2.88-6.97,5.16-9.71,2.28-2.73,5.16-4.88,8.64-6.45,3.48-1.57,7.57-2.36,12.29-2.36s8.83.79,12.34,2.36c3.52,1.57,6.43,3.72,8.75,6.45,2.32,2.73,4.04,5.97,5.16,9.71,1.12,3.74,1.68,7.74,1.68,12.01s-.56,8.23-1.68,11.89c-1.12,3.67-2.84,6.86-5.16,9.59-2.32,2.73-5.24,4.86-8.75,6.4-3.52,1.53-7.63,2.3-12.34,2.3ZM75.13,169.3c4.19,0,7.2-1.55,9.03-4.66,1.83-3.1,2.75-7.57,2.75-13.41s-.92-10.3-2.75-13.41c-1.83-3.1-4.84-4.66-9.03-4.66s-7.09,1.55-8.92,4.66c-1.83,3.11-2.75,7.57-2.75,13.41s.92,10.31,2.75,13.41c1.83,3.11,4.81,4.66,8.92,4.66ZM126.86,154.83c-4.19-1.2-7.46-2.97-9.82-5.33-2.36-2.36-3.53-5.89-3.53-10.6,0-5.68,2.04-10.14,6.12-13.35,4.08-3.22,9.63-4.83,16.66-4.83,2.92,0,5.8.26,8.64.79,2.84.52,5.72,1.31,8.64,2.36-.15,1.95-.52,3.97-1.12,6.06-.6,2.1-1.31,3.93-2.13,5.5-1.8-.75-3.78-1.4-5.95-1.96-2.17-.56-4.45-.84-6.85-.84-2.54,0-4.53.39-5.95,1.18-1.42.79-2.13,2.04-2.13,3.76s.5,2.81,1.51,3.48c1.01.67,2.45,1.31,4.32,1.91l6.4,1.91c2.09.6,3.98,1.33,5.67,2.19,1.68.86,3.12,1.93,4.32,3.2,1.2,1.27,2.13,2.84,2.81,4.71.67,1.87,1.01,4.15,1.01,6.84s-.58,5.35-1.74,7.74c-1.16,2.4-2.84,4.47-5.05,6.23-2.21,1.76-4.88,3.14-8.02,4.15-3.14,1.01-6.7,1.51-10.66,1.51-1.79,0-3.44-.06-4.94-.17-1.5-.11-2.94-.3-4.32-.56-1.38-.26-2.75-.58-4.1-.95-1.35-.37-2.8-.86-4.37-1.46.15-2.02.5-4.06,1.07-6.12.56-2.06,1.29-4.06,2.19-6,2.47.97,4.8,1.7,7.01,2.19,2.21.49,4.51.73,6.9.73,1.05,0,2.19-.09,3.42-.28,1.23-.19,2.37-.52,3.42-1.01,1.05-.49,1.93-1.12,2.64-1.91.71-.79,1.07-1.81,1.07-3.09,0-1.79-.54-3.09-1.63-3.87-1.08-.79-2.6-1.48-4.54-2.08l-6.96-2.02ZM166.24,122.06c2.69-.45,5.35-.67,7.97-.67s5.27.22,7.97.67v30.75c0,3.07.24,5.59.73,7.57.49,1.98,1.23,3.55,2.24,4.71,1.01,1.16,2.26,1.98,3.76,2.47,1.5.49,3.25.73,5.27.73,2.77,0,5.09-.26,6.96-.79v-45.44c2.69-.45,5.31-.67,7.85-.67s5.27.22,7.97.67v55.77c-2.39.82-5.55,1.63-9.48,2.41-3.93.79-8.02,1.18-12.29,1.18-3.82,0-7.48-.3-11-.9-3.52-.6-6.6-1.87-9.26-3.82-2.66-1.94-4.77-4.79-6.34-8.53-1.57-3.74-2.36-8.71-2.36-14.92v-31.19ZM232.11,180.07c-.45-2.77-.67-5.5-.67-8.19s.22-5.46.67-8.3c2.77-.45,5.5-.67,8.19-.67s5.46.22,8.3.67c.45,2.84.67,5.57.67,8.19,0,2.77-.22,5.54-.67,8.3-2.84.45-5.57.67-8.19.67-2.77,0-5.54-.22-8.3-.67ZM231.66,99.4c2.92-.45,5.8-.67,8.64-.67s5.83.22,8.75.67l-1.12,54.87c-2.62.45-5.12.67-7.52.67-2.54,0-5.09-.22-7.63-.67l-1.12-54.87Z"
        fill={color}
      />
      <path
        d="M150,0C67.16,0,0,67.16,0,150s67.16,150,150,150,150-67.16,150-150S232.84,0,150,0ZM150,285c-74.56,0-135-60.44-135-135S75.44,15,150,15s135,60.44,135,135-60.44,135-135,135Z"
        fill={color}
      />
    </svg>
  );
};

export const SearchIcon = makeFaIcon(faMagnifyingGlass);
export const ExpandAllIcon = makeFaIcon(faSquarePlus);
export const CollapseAllIcon = makeFaIcon(faSquareMinus);
export const LogOutIcon = makeFaIcon(faRightFromBracket);
export const UserSettingsIcon = makeFaIcon(faUserGear);
export const DiscordIcon = makeFaIcon(faDiscord);
export const YouTubeIcon = makeFaIcon(faYoutube);
export const TwitchIcon = makeFaIcon(faTwitch);
export const SheetIcon = makeFaIcon(faTable);
export const InfoIcon = makeFaIcon(faCircleInfo);
export const LinkIcon = makeFaIcon(faLink);
export const UnlinkIcon = makeFaIcon(faLinkSlash);
