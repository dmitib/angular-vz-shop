export interface AppSettings {
  color?: ColorType;
  addresses?: string[];
}

export type ColorType = 'default' | 'white' | 'blue';
