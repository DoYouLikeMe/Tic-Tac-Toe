const initialState = [
  ["O", "X", "O"],
  ["O", "O", "O"],
  ["O", "O", "O"],
];

export default function gameBoard() {
  return (
    <table className="gameboard">
      {initialState.map((row, rowIndex) => (
        <tr class="gameboard__row" key={rowIndex}>
          {row.map((dataCell, dataCellIndex) => (
            <td key="dataCellIndex" className="gameboard__cell">
              <button className="gameboard__button">{dataCell}</button>
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
