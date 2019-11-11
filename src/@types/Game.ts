export enum GameTurn {
  Player = "Player",
  AI = "AI",
  Finished = "Finished"
}

export enum GameCellType {
  Empty,
  Player,
  CPU
}

export interface GameBoard {
  board: GameCellType[][];
  message?: string;
  turn: GameTurn;
}
