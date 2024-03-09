import React, {useState} from 'react';
import FloatingButton from './FloatingButton';
import GameField from "./GameField";
import {Plant} from "./Plants";

const GlobalWindow = () => {
    Telegram.WebApp.ready()
    const [selectedElement, setSelectedElement] = useState<Plant>({name: '', dateTime: new Date()});
    const [digUp, setDigUp] = useState(false);

    const handleElementSelection = (plant: Plant) => {
        setSelectedElement(plant);
    };

    const toggleDigUp = () => {
        setDigUp(!digUp);
        return digUp;
    };

    return (
        <div style={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            height: '100vh'
        }}>
            <FloatingButton
                handleElementSelection={handleElementSelection}
                digUp={toggleDigUp}
            />
            <GameField plant={selectedElement} digUp={digUp}/>
        </div>
    );
};

export default GlobalWindow;
