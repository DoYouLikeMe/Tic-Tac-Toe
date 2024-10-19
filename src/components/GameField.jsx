export default function gameBoard({
  gameBoard,
  handleGameTurns,
  winner,
  isDraw,
}) {
  const oSymbol = <span className="oSymbol">O</span>;
  const xSymbol = <span className="xSymbol">X</span>;

  return (
    <div className="gameboard">
      {gameBoard.map((row, rowIndex) => (
        <div className="gameboard__column" key={rowIndex}>
          {row.map((dataCell, dataCellIndex) => (
            <div key={dataCellIndex} className="gameboard__cell">
              {dataCell === null ? (
                <button
                  disabled={winner !== null || isDraw}
                  onClick={() => handleGameTurns(rowIndex, dataCellIndex)}
                  className="gameboard__button"
                ></button>
              ) : dataCell === "X" ? (
                xSymbol
              ) : (
                oSymbol
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
