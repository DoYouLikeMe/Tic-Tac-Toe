import "./App.css";
import Header from "./components/Header";
import GameField from "./components/GameField";
import {useState, useEffect} from "react";
import RestartButton from "./components/RestartButton";
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
  let winner = null;
  let isDraw = false;
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
      handleGameOver(gameBoardData);
      return updateTurns;
    });
  };
  const restartGame = () => {
    gameBoardData = gameBoardData.map((row) => row.map((cell) => null));
    setGameTurns([]);
    setCurrentPlayer("X");
  };
  const handleGameOver = (gameboard) => {
    const verticalLinesCombination = gameboard.map((line) =>
      Array.from(new Set(line))
    );
    const horizontalLinesCombination = gameboard.map((line, index) => {
      const simbols = [];
      gameboard.forEach((line) => simbols.push(line[index]));
      return Array.from(new Set(simbols));
    });

    const crossLinesLeftCombination = Array.from(
      new Set([gameboard[0][0], gameboard[1][1], gameboard[2][2]])
    );

    const crossLinesRightCombination = Array.from(
      new Set([gameboard[0][2], gameboard[1][1], gameboard[2][0]])
    );

    const winningCombination = [
      verticalLinesCombination,
      horizontalLinesCombination,
      [crossLinesLeftCombination, crossLinesRightCombination],
    ]
      .flat()
      .filter(
        (combination) => combination.length === 1 && !combination.includes(null)
      );

    if (winningCombination.length) winner = currentPlayer;
    else if (!gameboard.flat().includes(null)) isDraw = true;

    console.log(isDraw, winner);
  };
  return (
    <>
      <Header />
      <GameField handleGameTurns={handleGameTurns} gameBoard={gameBoardData} />
      <RestartButton
        winner={winner}
        isDraw={isDraw}
        restartHandler={restartGame}
      >
        R - Restart Game
      </RestartButton>
    </>
  );
}

export default App;
