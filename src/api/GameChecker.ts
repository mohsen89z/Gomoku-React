import { GameCellType, GameTurn, GameBoard, Maybe } from "../@types";

const getCell = (
  board: GameCellType[][],
  x: number,
  y: number
): Maybe<GameCellType> => {
  if (board[x]) return board[x][y];
  return undefined;
};

const horizentalChecker = (
  board: GameCellType[][],
  x: number,
  y: number,
  type: GameCellType
) =>
  Array.from({ length: 5 }, (_, p) => getCell(board, x, y + p) === type).find(
    v => !v
  ) === undefined;

const verticalChecker = (
  board: GameCellType[][],
  x: number,
  y: number,
  type: GameCellType
) =>
  Array.from({ length: 5 }, (_, p) => getCell(board, x + p, y) === type).find(
    v => !v
  ) === undefined;

const crossChecker = (
  board: GameCellType[][],
  x: number,
  y: number,
  type: GameCellType
) =>
  Array.from(
    { length: 5 },
    (_, p) => getCell(board, x + p, y + p) === type
  ).find(v => !v) === undefined;

const antiCrossChecker = (
  board: GameCellType[][],
  x: number,
  y: number,
  type: GameCellType
) =>
  Array.from(
    { length: 5 },
    (_, p) => getCell(board, x + p, y - p) === type
  ).find(v => !v) === undefined;

const gameSideChecker = (
  board: GameCellType[][],
  size: number,
  type: GameCellType
) => {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (
        horizentalChecker(board, x, y, type) ||
        verticalChecker(board, x, y, type) ||
        crossChecker(board, x, y, type) ||
        antiCrossChecker(board, x, y, type)
      ) {
        return true;
      }
    }
  }
  return false;
};

export const CheckGameFinished = (
  board: GameCellType[][],
  size: number,
  setGameBoard: (gameBoard: GameBoard) => void
): boolean => {
  if (gameSideChecker(board, size, GameCellType.Player)) {
    setGameBoard({
      turn: GameTurn.Finished,
      board,
      message: "Player won the Game!"
    });
    return true;
  } else if (gameSideChecker(board, size, GameCellType.CPU)) {
    setGameBoard({
      turn: GameTurn.Finished,
      board,
      message: "Bot won the Game!"
    });
    return true;
  }
  return false;
};
