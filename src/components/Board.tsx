import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { GameCell } from "./GameCell";
import { NextMove,CheckGameFinished } from "../api";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { GameCellType, GameTurn, GameBoard } from "../@types";

const useStyles = (size: number) =>
  makeStyles(() => ({
    gridList: {
      width: 30 * size
    }
  }));

interface BoardProps {
  size: number;
}

const initBoard = (size: number): GameCellType[][] =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => GameCellType.Empty)
  );

export const Board: React.FC<BoardProps> = ({ size }) => {
  const [gameBoard, setGameBoard] = useState<GameBoard>({
    turn: GameTurn.Player,
    board: initBoard(size)
  });

  const restartGame = () =>
    setGameBoard({
      turn: GameTurn.Player,
      board: initBoard(size)
    });

  const renderBoard = (board: GameCellType[][]): React.ReactElement[] => {
    const result: React.ReactElement[] = [];
    board.forEach((row, x) =>
      row.forEach((cell, y) => {
        result.push(
          <GridListTile key={`row-${x}-cell-${y}`}>
            <GameCell
              handleClick={() => {
                board[x][y] = GameCellType.Player;
                setGameBoard({
                  turn: GameTurn.AI,
                  board
                });
              }}
              type={cell}
              turn={gameBoard.turn}
            />
          </GridListTile>
        );
      })
    );

    return result;
  };

  useEffect(() => {
    if (gameBoard.turn !== GameTurn.Finished) {
      setTimeout(() => {
        const check = CheckGameFinished(gameBoard.board, size, setGameBoard);
        if (!check && gameBoard.turn === GameTurn.AI) {
          setTimeout(() => {
            NextMove(gameBoard.board, size, setGameBoard);
          }, 100);
        }
      }, 100);
    }
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Current Player: {gameBoard.turn}
      </Typography>

      <GridList
        className={useStyles(size)({}).gridList}
        cellHeight={30}
        cols={size}
        spacing={0}
      >
        {renderBoard(gameBoard.board)}
      </GridList>

      {gameBoard.message
        ? [
            <Typography key="msg" variant="h5" gutterBottom>
              {gameBoard.message}
            </Typography>,
            <Button
              variant="outlined"
              color="primary"
              key="btn"
              onClick={restartGame}
            >
              Restart
            </Button>
          ]
        : null}
    </div>
  );
};
