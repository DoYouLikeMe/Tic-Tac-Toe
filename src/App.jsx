import "./App.css";
import Header from "./components/Header";
import GameField from "./components/GameField";
import {useState} from "react";
import gameBoard from "./components/GameField";

let gameBoardData = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    firstPlayer: {
      playerName: "Player 1",
      playerSimbol: "X",
    },
    secondPlayer: {
      playerName: "Player 1",
      playerSimbol: "O",
    },
  });
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleGameTurns = (rowIndex, colIndex) => {
    setGameTurns((prevState) => {
      const updateTurns = [
        {
          moveBy: currentPlayer,
          row: rowIndex,
          col: colIndex,
          ...prevState,
        },
      ];

      gameBoardData[updateTurns[0].row][updateTurns[0].col] = currentPlayer;
      setCurrentPlayer((curentPlayer) => {
        return curentPlayer === "X" ? "O" : "X";
      });
      return updateTurns;
    });
  };

  return (
    <>
      <Header />
      <GameField handleGameTurns={handleGameTurns} gameBoard={gameBoardData} />
    </>
  );
}

export default App;
