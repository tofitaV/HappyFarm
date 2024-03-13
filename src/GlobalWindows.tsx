import React, {useState} from 'react';
import FloatingButton from './FloatingButton';
import GameField from "./GameField";
import {Plant} from "./Plant/Plants";

const GlobalWindow = () => {
    const [selectedElement, setSelectedElement] = useState<Plant>();
    const [digUp, setDigUp] = useState(false);
    const [getWater, setWater] = useState(false);
    const [harvest, setHarvest] = useState(false);

    const handleElementSelection = (plant: Plant) => {
        setSelectedElement(plant);
    };

    const toggleDigUp = () => {
        setDigUp(!digUp);
        return digUp;
    };

    const toggleGetWater = () => {
        setWater(!getWater);
        return getWater;
    };

    const toggleHarvest = () => {
        setHarvest(!harvest);
        return harvest;
    };

    return (
        <div className='global-window' style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '100vh'
        }}>
            <FloatingButton
                handleElementSelection={handleElementSelection}
                digUp={toggleDigUp}
                getWater={toggleGetWater}
                harvest={toggleHarvest}
            />
            <GameField plant={selectedElement} digUp={digUp} getWater={getWater} harvest={harvest}/>
        </div>
    );
};

export default GlobalWindow;
