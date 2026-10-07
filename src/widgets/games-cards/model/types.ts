export type GameCardAccent = 'purple' | 'yellow' | 'red' | 'green';

export interface GameCardData {
  id: string;
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
  accentColor: GameCardAccent;
}
