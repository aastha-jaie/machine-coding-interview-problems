import { useEffect, useRef, useState } from "react";

const SpreadSheet = ({ rows = 3, cols = 3 }) => {
  //lazy initialize initialState to avoid initialising on every render
  const [gridData, setGridData] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill("")),
  );

  //adding ref to every cell to manage focus
  const cellRefs = useRef([]);

  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });

  useEffect(() => {
    const cell = cellRefs.current[`${activeCell.row}-${activeCell.col}`];
    cell?.focus();
  }, [activeCell]);

  //add row to the bottom
  const addRow = () => {
    const newGrid = Array(gridData[0].length).fill("");
    setGridData((prevGrid) => [...prevGrid, newGrid]);
  };
  //add column to the right
  const addColumn = () => {
    setGridData((prev) => prev.map((row) => [...row, ""]));
  };
  //onChange of cell input value
  const handleChange = (rowIndex, colIndex, value) => {
    console.log('rowIndex',rowIndex)
    setGridData((prev) =>
      prev.map((row, r) =>
        r === rowIndex
          ? row.map((cell, c) => (c === colIndex ? value : cell))
          : row,
      ),
    );
  };

  //Keyboard navigation for arrow keys
  const handleKeyChange = (e, rowIndex, colIndex) => {
    let newRow = rowIndex;
    let newCol = colIndex;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newCol = Math.min(colIndex + 1, gridData[0].length - 1);
        break;
      case "ArrowLeft":
        e.preventDefault();

        newCol = Math.max(colIndex - 1, 0);
        break;

      case "ArrowUp":
        e.preventDefault();

        newRow = Math.max(rowIndex - 1, 0);
        break;

      case "ArrowDown":
        e.preventDefault();

        newRow = Math.min(rowIndex + 1, gridData.length - 1);
        break;

      default:
        return;
    }
    setActiveCell({ row: newRow, col: newCol });
  };

  return (
    <div className="spreadsheet-container">
      {gridData.map((row, rowIndex) => (
        <div className="rows" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className={`row-${rowIndex} col-${colIndex} cell ${
                activeCell.row === rowIndex && activeCell.col === colIndex
                  ? "active"
                  : ""
              }`}
              value={cell ?? ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              onKeyDown={(e) => handleKeyChange(e, rowIndex, colIndex)}
              ref={(el) =>
                (cellRefs.current[`${rowIndex}-${colIndex}`] = el)
              }
            />
          ))}
        </div>
      ))}
      <div className="actions">
        <button onClick={() => addRow()}>Add Row</button>
        <button onClick={() => addColumn()}>Add Column</button>
      </div>
    </div>
  );
};
export default SpreadSheet;
