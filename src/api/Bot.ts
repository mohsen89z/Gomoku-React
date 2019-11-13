import {
  GamePattern,
  Pattern,
  GameCellType,
  GameBoard,
  StrategyPower,
  GameTurn
} from "../@types";
import { CheckPattern, getCell } from "./Engine";

const H = Pattern.Hit;
const E = Pattern.Empty;

const BotPlayPatterns: GamePattern[] = [
  // Power of 4
  {
    pattern: [E, H, H, H, H],
    index: 0,
    power: 4
  },
  {
    pattern: [H, E, H, H, H],
    index: 1,
    power: 4
  },
  {
    pattern: [H, H, E, H, H],
    index: 2,
    power: 4
  },
  {
    pattern: [H, H, H, E, H],
    index: 3,
    power: 4
  },
  {
    pattern: [H, H, H, H, E],
    index: 4,
    power: 4
  },
  // Power of 3
  {
    pattern: [E, H, H, H],
    index: 0,
    power: 3
  },
  {
    pattern: [H, E, H, H],
    index: 1,
    power: 3
  },
  {
    pattern: [H, H, E, H],
    index: 2,
    power: 3
  },
  {
    pattern: [H, H, H, E],
    index: 3,
    power: 3
  },
  // Power of 2
  {
    pattern: [E, H, H],
    index: 0,
    power: 2
  },
  {
    pattern: [H, E, H],
    index: 1,
    power: 2
  },
  {
    pattern: [H, H, E],
    index: 2,
    power: 2
  },
  // Power of 1
  {
    pattern: [E, H],
    index: 0,
    power: 1
  },
  {
    pattern: [H, E],
    index: 1,
    power: 1
  }
];

export type StrategyResult = {
  x: number;
  y: number;
  power: StrategyPower;
};

const getRandomEmptyCell = (
  board: GameCellType[][],
  size: number
): StrategyResult => {
  let x = Math.floor(Math.random() * size);
  let y = Math.floor(Math.random() * size);
  while (getCell(board, x, y) !== GameCellType.Empty) {
    x = Math.floor(Math.random() * size);
    y = Math.floor(Math.random() * size);
  }

  return { x, y, power: -1 };
};

const findBestStrategy = (
  board: GameCellType[][],
  size: number,
  type: GameCellType
): StrategyResult => {
  for (const pattern of BotPlayPatterns) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const direction = CheckPattern(board, x, y, size, type, pattern);
        if (direction !== undefined) {
          return {
            power: pattern.power,
            x: x + pattern.index * direction.x,
            y: y + pattern.index * direction.y
          };
        }
      }
    }
  }

  return getRandomEmptyCell(board, size);
};

export const NextMove = (
  board: GameCellType[][],
  size: number,
  setGameBoard: (gameBoard: GameBoard) => void
) => {
  const [defensive, offensive] = [
    findBestStrategy(board, size, GameCellType.Player),
    findBestStrategy(board, size, GameCellType.CPU)
  ];

  const strategy = offensive.power > defensive.power ? offensive : defensive;

  board[strategy.x][strategy.y] = GameCellType.CPU;

  setGameBoard({
    turn: GameTurn.Player,
    board
  });
};
