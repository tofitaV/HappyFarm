import React, {useCallback, useContext, useEffect, useState} from 'react';
import './GameField.scss';
import {Plant} from './Plant/Plants';
import {createPlant, getDepot, getPlants} from './API/PlantAPI';
import AccountComponent from "./AccountComponent";
import {Action} from "./Actions/Action";
import {MyContext} from "./contexts/AppContext";
import {DoNothing} from "./Actions/DoNothing";
import {PlantEnum} from "./Plant/PlantEnum";
import {HarvestAction} from "./Actions/HarvestAction";
import {plants} from "./enums/PlantsEnum";


const GameField: React.FC = () => {
    const rows = 3;
    const cols = 3;
    const {action, setAction} = useContext(MyContext)
    const {plant, setPlant} = useContext(MyContext)
    const {account, setAccount} = useContext(MyContext)

    const initialCells: (Plant | null)[][] = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => null)
    );

    const [cells, setCells] = useState<(Plant | null)[][]>(initialCells);

    useEffect(() => {
        const intervalId = setInterval(() => {
            cells.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell?.isGrow === true || cell === null) {
                        return;
                    }
                    if (new Date(cell?.actualTimeToGrow).getTime() - new Date().getTime() <= 0) { //TODO ЗАЙВИЙ ТРІГЕТ ГЕТ ЗАПИТУ ПІСЛЯ ПОЛИВКИ
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
            if (plant && plant?.plantType != PlantEnum.Nothing) {
                let plantObject = {...plant, dateTime: new Date(), positionCol: col, positionRow: row};
                createPlant(plantObject).then(() =>
                    getPlants().then((res) => {
                        setCells(updateCells(res));
                    })
                );
            }
        },
        []
    );

    const plantAction = useCallback(async (plant: Plant | null, action: Action) => {
            if (plant) {
                const res = await action.doAction(plant)
                console.log(res)
                setCells(updateCells(res));
            }
            if (action instanceof HarvestAction) {
                getDepot().then((res) => {
                    setAccount(res)
                })
            }
        },
        [setCells]
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

                const currentPlant = plants.find(plant => plant.type === cells[i][j]?.plantType);

                if (currentPlant) {
                    cellContent = (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => plantAction(cells[i][j], action)}
                            onMouseOver={(e) => handleMouseOver(e, cells[i][j])}
                        >
                            {cells[i][j]?.isGrow  ? (
                                <img className="plant animation" src={currentPlant.image} alt={currentPlant.name} />
                            ) : (
                                <img className="plant" src={plants[3].image} alt={plants[3].name} />
                            )}
                        </div>
                    );
                } else {
                    cellContent = (
                        <div
                            className="empty-cell"
                            key={`${i}-${j}`}
                            onClick={() => {
                                if (action instanceof DoNothing) {
                                    placeIntoGardenBeds(i, j, plant)
                                }
                            }}
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
        <>
            <div className="warehouse-wrapper">
                <AccountComponent account={account}/>
            </div>
            <div className="game-field">
                {renderGrid()}
            </div>
        </>
    );
};

export default GameField;
