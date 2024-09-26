import "./App.css";
import Header from "./components/Header";
import GameField from "./components/GameField";
import {useState, useEffect} from "react";
import RestartButton from "./components/RestartButton";
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
  const handleKeys = (event) => {
    switch (event.code) {
      case "KeyR":
        return restartGame();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, []);

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
  const restartGame = () => {
    gameBoardData = gameBoardData.map((row) => row.map((cell) => null));
    setGameTurns([]);
    setCurrentPlayer("X");
  };
  return (
    <>
      <Header />
      <GameField handleGameTurns={handleGameTurns} gameBoard={gameBoardData} />
      <RestartButton restartHandler={restartGame}>
        R - Restart Game
      </RestartButton>
    </>
  );
}

export default App;
