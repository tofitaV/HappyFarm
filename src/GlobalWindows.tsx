import React, {useState} from 'react';
import FloatingButton from './FloatingButton';
import GameField from "./GameField";
import {Plant} from "./Plants";

const GlobalWindow = () => {
    Telegram.WebApp.ready()
    const [selectedElement, setSelectedElement] = useState<Plant>({name: '', dateTime: new Date()});

    const handleElementSelection = (plant: Plant) => {
        setSelectedElement(plant);
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
            />
            <GameField plant={selectedElement}/>
        </div>
    );
};

export default GlobalWindow;
