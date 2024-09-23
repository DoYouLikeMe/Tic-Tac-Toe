const initialState = [
  [null, null, null],
  [null, null, null],
  [null, null, "sss"],
];

export default function gameBoard() {
  return (
    <table className="gameboard">
      {initialState.map((row, rowIndex) => (
        <tr className="gameboard__row" key={rowIndex}>
          {row.map((dataCell, dataCellIndex) => (
            <td key={dataCellIndex} className="gameboard__cell">
              {dataCell === null ? (
                <button className="gameboard__button">{dataCell}</button>
              ) : (
                dataCell
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
