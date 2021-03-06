import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const viewMoreNames = [
  'Sync Clipboard History',
  'Preferences',
  'About',
  'Exit',
] as const;

export type ViewMoreName = typeof viewMoreNames[number];

export const sidebarIconNames = [
  'Recent Clipboards',
  'Starred Clipboards',
  'History',
  'View more',
] as const;

export type SidebarIconName = typeof sidebarIconNames[number];

export type SidebarIcon = {
  name: SidebarIconName;
  icon: IconProp;
  current: boolean;
};

export const GLOBAL_SHORTCUT_KEYS = [
  'none',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
] as const;

export type GlobalShortcutKeysType = typeof GLOBAL_SHORTCUT_KEYS[number];
