import {
  GamePattern,
  Pattern,
  GameCellType,
  GameBoard,
  GameTurn
} from "../@types";
import { CheckPattern } from "./Engine";

const gameSideChecker = (
  board: GameCellType[][],
  size: number,
  type: GameCellType
): boolean => {
  const H = Pattern.Hit;
  const pattern: GamePattern = {
    pattern: [H, H, H, H, H],
    index: 0,
    power: 0
  };

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const direction = CheckPattern(board, x, y, size, type, pattern);
      if (direction !== undefined) {
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
