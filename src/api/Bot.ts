import { GameCellType, GameTurn, GameBoard, Maybe } from "../@types";

export type StrategyPower = -1 | 0 | 1 | 2 | 3 | 4;
export interface Strategy {
  power: StrategyPower;
  x: number;
  y: number;
}

const getCell = (
  board: GameCellType[][],
  x: number,
  y: number
): Maybe<GameCellType> => {
  if (board[x]) return board[x][y];
  return undefined;
};

const horizentalCheck = (
  board: GameCellType[][],
  x: number,
  y: number,
  power: StrategyPower,
  size: number,
  type: GameCellType
): Maybe<Strategy> => {
  let check =
    y + power < size &&
    Array.from(
      { length: power },
      (_, p) => getCell(board, x, y + p) === type
    ).find(v => !v) === undefined;

  if (check) {
    if (getCell(board, x, y - 1) === GameCellType.Empty) {
      return {
        power,
        x,
        y: y - 1
      };
    }
    if (getCell(board, x, y + power) === GameCellType.Empty) {
      return {
        power,
        x,
        y: y + power
      };
    }
  }
};

const verticalCheck = (
  board: GameCellType[][],
  x: number,
  y: number,
  power: StrategyPower,
  size: number,
  type: GameCellType
): Maybe<Strategy> => {
  let check =
    x + power < size &&
    Array.from(
      { length: power },
      (_, p) => getCell(board, x + p, y) === type
    ).find(v => !v) === undefined;

  if (check) {
    if (getCell(board, x - 1, y) === GameCellType.Empty) {
      return {
        power,
        x: x - 1,
        y
      };
    }
    if (getCell(board, x + power, y) === GameCellType.Empty) {
      return {
        power,
        x: x + power,
        y
      };
    }
  }
};

const crossCheck = (
  board: GameCellType[][],
  x: number,
  y: number,
  power: StrategyPower,
  size: number,
  type: GameCellType
): Maybe<Strategy> => {
  let check =
    x + power < size &&
    y + power < size &&
    Array.from(
      { length: power },
      (_, p) => getCell(board, x + p, y + p) === type
    ).find(v => !v) === undefined;

  if (check) {
    if (getCell(board, x - 1, y - 1) === GameCellType.Empty) {
      return {
        power,
        x: x - 1,
        y: y - 1
      };
    }
    if (getCell(board, x + power, y + power) === GameCellType.Empty) {
      return {
        power,
        x: x + power,
        y: y + power
      };
    }
  }
};

const antiCrossCheck = (
  board: GameCellType[][],
  x: number,
  y: number,
  power: StrategyPower,
  size: number,
  type: GameCellType
): Maybe<Strategy> => {
  let check =
    Array.from(
      { length: power },
      (_, p) => getCell(board, x + p, y - p) === type
    ).find(v => !v) === undefined;

  if (check) {
    if (getCell(board, x - 1, y + 1) === GameCellType.Empty) {
      return {
        power,
        x: x - 1,
        y: y + 1
      };
    }
    if (getCell(board, x + power, y - power) === GameCellType.Empty) {
      return {
        power,
        x: x + power,
        y: y - power
      };
    }
  }
};

const getRandomEmptyCell = (
  board: GameCellType[][],
  size: number
): Strategy => {
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
): Strategy => {
  for (let power: StrategyPower = 4; power > 0; power--) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        // check horizental matching
        const hCheck = horizentalCheck(
          board,
          x,
          y,
          power as StrategyPower,
          size,
          type
        );
        if (hCheck !== undefined) return hCheck;

        // check vertical matching
        const vCheck = verticalCheck(
          board,
          x,
          y,
          power as StrategyPower,
          size,
          type
        );
        if (vCheck !== undefined) return vCheck;

        // check cross matching
        const cCheck = crossCheck(
          board,
          x,
          y,
          power as StrategyPower,
          size,
          type
        );
        if (cCheck !== undefined) return cCheck;

        // check anti cross matching
        const acCheck = antiCrossCheck(
          board,
          x,
          y,
          power as StrategyPower,
          size,
          type
        );
        if (acCheck !== undefined) return acCheck;
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
