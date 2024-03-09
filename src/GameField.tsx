import React, {useState} from 'react';
import './GameField.css';

interface Props {
    selectedElement: string;
}

const GameField: React.FC<Props> = ({selectedElement}) => {
    const rows = 10;
    const cols = 10;

    const initialCells: (string | null)[][] = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => null)
    );

    // Define state to track the cells and what they contain
    const [cells, setCells] = useState<(string | null)[][]>(initialCells);

    const selectedItem = selectedElement;

    const placeIntoGardenBeds = (row: number, col: number, type: string) => {
        const newCells = cells.map((row) => [...row]);
        newCells[row][col] = type;
        setCells(newCells);
    };

    const renderGrid = () => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                // Render different elements based on cell content
                let cellContent;
                if (cells[i][j] === 'corn') {
                    cellContent = <div className="corn" key={`${i}-${j}`}> 🌽</div>;
                } else if (cells[i][j] === 'paper') {
                    cellContent = <div className="paper" key={`${i}-${j}`}> 🫑</div>;
                } else if (cells[i][j] === 'carrot') {
                    cellContent = <div className="carrot" key={`${i}-${j}`}> 🥕</div>;
                } else {
                    cellContent = (
                        <div className="empty" key={`${i}-${j}`}
                             onClick={() => placeIntoGardenBeds(i, j, selectedItem)} style={{width: '100%'}}>
                            {/* Add some content to the empty cells */}
                            &nbsp;
                        </div>
                    );
                }
                row.push(
                    <div className="cell" key={`${i}-${j}`}>
                        {cellContent}
                    </div>
                );
            }
            grid.push(<div className="row" key={i}>{row}</div>);
        }
        return grid;
    };

    return (
        <div className="game-field">
            {renderGrid()}
        </div>
    );
};

export default GameField;
