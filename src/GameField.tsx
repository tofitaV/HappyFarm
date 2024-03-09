import React, {useState} from 'react';
import './GameField.css';
import {Plant} from "./Plants";

interface Props {
    plant: Plant;
}

const GameField: React.FC<Props> = ({plant}) => {
    const rows = 10;
    const cols = 10;

    const initialCells: (Plant | null)[][] = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => null)
    );

    // Define state to track the cells and what they contain
    const [cells, setCells] = useState<(Plant | null)[][]>(initialCells);
    const [plants, setPlants] = useState<Plant[]>([]);
    const selectedItem = plant;

    const placeIntoGardenBeds = (row: number, col: number, plant: Plant) => {
        const newCells = cells.map((row) => [...row]);
        newCells[row][col] = {...plant, dateTime: new Date()};
        setCells(newCells);
    };


    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>, plant: Plant | null) => {
        if (plant) {
            const date = plant.dateTime ? new Date(plant.dateTime) : null;
            const formattedDate = date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : '';
            event.currentTarget.title = `${plant.name || ''} ${formattedDate}`;
        }
    };

    const renderGrid = () => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                // Render different elements based on cell content
                let cellContent;
                if (cells[i][j]?.name === 'corn') {
                    cellContent = <div className="corn" key={`${i}-${j}`} onMouseOver={(e) => handleMouseOver(e, cells[i][j])}>🌽</div>;
                } else if (cells[i][j]?.name === 'paper') {
                    cellContent = <div className="paper" key={`${i}-${j}`} onMouseOver={(e) => handleMouseOver(e, cells[i][j])}>🫑</div>;
                } else if (cells[i][j]?.name === 'carrot') {
                    cellContent = <div className="carrot" key={`${i}-${j}`} onMouseOver={(e) => handleMouseOver(e, cells[i][j])}>🥕</div>;
                } else {
                    cellContent = (
                        <div className="empty-cell" key={`${i}-${j}`}
                             onClick={() => placeIntoGardenBeds(i, j, selectedItem)}>
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
