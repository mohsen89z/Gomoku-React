import {
  Maybe,
  GameCellType,
  GamePattern,
  PatternDirections,
  Pattern,
  PatternDirection
} from "../@types";

export const getCell = (
  board: GameCellType[][],
  x: number,
  y: number
): Maybe<GameCellType> => {
  if (board[x]) return board[x][y];
  return undefined;
};

export const CheckPattern = (
  board: GameCellType[][],
  x: number,
  y: number,
  size: number,
  type: GameCellType,
  gamePattern: GamePattern
): Maybe<PatternDirection> => {
  for (const direction of PatternDirections) {
    const check =
      gamePattern.pattern
        .map((pattern, index) => {
          if (
            pattern === Pattern.Hit &&
            getCell(board, x + index * direction.x, y + index * direction.y) ===
              type
          ) {
            return true;
          } else if (
            pattern === Pattern.Empty &&
            getCell(board, x + index * direction.x, y + index * direction.y) ===
              GameCellType.Empty
          ) {
            return true;
          }
          return false;
        })
        .find(v => !v) === undefined;
    if (check) {
      return direction;
    }
  }
  return undefined;
};
