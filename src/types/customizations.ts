import { ClassIDS } from ".";

export type RGBA = {
  enabled: boolean;
  // Highlight
  c: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  // Text
  t: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export type Colors = {
  schedule: {
    [key in ClassIDS]: RGBA;
  };
  currentClass: RGBA;
  scheduleFrame: RGBA;
};

export type Keybinds = {
  goForwardOneDay: string;
  goBackOneDay: string;
  goToToday: string;
};

export type Icon = {
  enabled: boolean;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

export type Customizations = {
  theme: {
    colors: Colors;
    icons: {
      class: Icon;
      lunch: Icon;
      currentClass: Icon;
    };
  };
  keybinds: Keybinds;
  showInfoOnSchedule: boolean;
  tutorial: {
    moreMap: boolean;
  };
};
