export enum Pattern {
  Hit,
  Empty
}

export type StrategyPower = -1 | 0 | 1 | 2 | 3 | 4;

export interface GamePattern {
  pattern: Pattern[];
  index: number;
  power: StrategyPower;
}

type Direction = -1 | 0 | 1;

export interface PatternDirection {
  x: Direction;
  y: Direction;
}

export const PatternDirections: PatternDirection[] = [
  {
    x: +1,
    y: 0
  },
  {
    x: 0,
    y: +1
  },
  {
    x: +1,
    y: +1
  },
  {
    x: +1,
    y: -1
  }
];
