import React, {useCallback, useEffect, useState} from 'react';
import './GameField.css';
import {Plant} from './Plant/Plants';
import {createPlant, deletePlants, getDepot, getPlants, nextPlantStage, plantHarvest} from './API/PlantAPI';
import {Account} from "./Plant/Account";
import AccountComponent from "./AccountComponent";

interface Props {
    plant: Plant | undefined;
    digUp: boolean;
    getWater: boolean;
    harvest: boolean;
}

const GameField: React.FC<Props> = ({plant, digUp, getWater, harvest}) => {
    const rows = 10;
    const cols = 10;

    const initialCells: (Plant | null)[][] = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => null)
    );

    const [cells, setCells] = useState<(Plant | null)[][]>(initialCells);
    const [account, setAccount] = useState<Account>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            cells.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell?.isGrow === true || cell === null) {
                        return;
                    }
                    if (new Date(cell?.actualTimeToGrow).getTime() - new Date().getTime() <= 0) {
                        getPlants().then((res) => {
                            setCells(updateCells(res));
                        });
                    }
                });
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [initialCells]);

    useEffect(() => {
        getPlants().then((res) => {
            setCells(updateCells(res));
        });
        getDepot().then((res) => {
            setAccount(res)
        })
    }, []);

    const updateCells = (plants: Plant[]) => {
        const newCells = initialCells.map(row => [...row]);
        plants.forEach((plant: Plant) => {
            newCells[plant.positionRow][plant.positionCol] = plant;

        });
        return newCells;
    };

    const placeIntoGardenBeds = useCallback(
        (row: number, col: number, plant: Plant | undefined) => {
            if (!digUp && !getWater && plant) {
                let plantObject = {...plant, dateTime: new Date(), positionCol: col, positionRow: row};
                createPlant(plantObject).then(() =>
                    getPlants().then((res) => {
                        setCells(updateCells(res));
                    })
                );
            }
        },
        [digUp]
    );

    const plantAction = useCallback(
        (plant: Plant | null) => {
            if (digUp && !getWater) {
                deletePlants(plant).then((res) => {
                    setCells(updateCells(res));
                });
            }
            if (getWater && !digUp && plant && plant?.stageOfGrowing < 1) {
                nextPlantStage(plant).then(() =>
                    getPlants().then((res) => {
                        setCells(updateCells(res));
                    })
                );
            }
            if (!getWater && !digUp && plant && plant?.isGrow === true) {
                plantHarvest(plant).then((res) => {
                        setAccount(res)
                        getPlants().then((res) => {
                            setCells(updateCells(res));
                        })
                    }
                );
            }
        },
        [digUp, getWater, harvest]
    );

    const handleMouseOver = useCallback((event: React.MouseEvent<HTMLDivElement>, plant: Plant | null) => {
        if (plant) {
            const currentTime = new Date();
            const endTime = new Date(plant.actualTimeToGrow);
            const timeRemaining = endTime.getTime() - currentTime.getTime();
            const minutes = Math.floor(timeRemaining / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            let result = '';
            if (seconds < 0) {
                result = 'Соберите урожай!'
            } else {
                result = `Созреет через ${minutes}m ${seconds}s`;
            }
            event.currentTarget.title = `${plant.name || ''} \nПосажено в ${plant.dateTime} \n${result}`;
        }


    }, []);

    const renderGrid = useCallback(() => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                let cellContent;
                if (cells[i][j]?.name === 'corn') {
                    cellContent = (
                        <div
                            className="corn"
                            key={`${i}-${j}`}
                            onClick={() => plantAction(cells[i][j])}
                            onMouseOver={(e) => handleMouseOver(e, cells[i][j])}
                        >
                            {cells[i][j]?.isGrow ? '🌽' : '🌱'}
                        </div>
                    );

                } else if (cells[i][j]?.name === 'pepper') {
                    cellContent = (

                        <div
                            className="pepper"
                            key={`${i}-${j}`}
                            onClick={() => plantAction(cells[i][j])}
                            onMouseOver={(e) => handleMouseOver(e, cells[i][j])}
                        >
                            {cells[i][j]?.isGrow ? '🫑' : '🌱'}
                        </div>
                    );
                } else if (cells[i][j]?.name === 'carrot') {
                    cellContent = (
                        <div
                            className="carrot"
                            key={`${i}-${j}`}
                            onClick={() => plantAction(cells[i][j])}
                            onMouseOver={(e) => handleMouseOver(e, cells[i][j])}
                        >
                            {cells[i][j]?.isGrow ? '🥕' : '🌱'}
                        </div>
                    );
                } else {
                    cellContent = (
                        <div
                            className="empty-cell"
                            key={`${i}-${j}`}
                            onClick={() => placeIntoGardenBeds(i, j, plant)}
                        >
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
    }, [cells, cols, plantAction, initialCells, placeIntoGardenBeds, plant, rows]);

    return (
        <div className="game-field">
            <AccountComponent account={account}/>
            {renderGrid()}
        </div>
    );
};

export default GameField;
