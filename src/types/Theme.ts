import { DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';

export type DefaultCssDeclaration = FlattenInterpolation<ThemeProps<DefaultTheme>>;
export type ThemedStyleTemplate = (props: WithTheme) => DefaultCssDeclaration;

export interface Attributes {
  BG_COLOR?: string;
  BORDER_COLOR?: string;
  BOX_SHADOW?: string;
  FILL_COLOR?: string;
  ICON_COLOR?: string;
  MENU_ELEMENT_COLOR?: string;
  TEXT_COLOR?: string;
  OPACITY?: string;
  SECONDARY_BG_COLOR?: string;
  SECONDARY_TEXT_COLOR?: string;
}

export interface States {
  active?: Attributes;
  disabled?: Attributes;
  error?: Attributes;
  hover?: Attributes;
  inactive?: Attributes;
  normal: Attributes;
}

export type AppColors = Record<'body' | 'header', States>;
export type TextColors = Record<'title' | 'body', States>;
export type TextFieldColors = Record<'default' | 'outlined' | 'filled', States>;
export type ButtonColors = Record<'content' | 'outline', States>;

export interface Theme {
    app: AppColors;
    button: ButtonColors;
    textfield: TextFieldColors;
}

export interface WithTheme {
  theme: Theme;
  [key: string]: unknown;
}