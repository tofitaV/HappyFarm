import React, {useState} from 'react';
import FloatingButton from './FloatingButton';
import GameField from "./GameField";

const GlobalWindow = () => {
    Telegram.WebApp.ready()
    const [selectedElement, setSelectedElement] = useState<string>('');

    const handleElementSelection = (element: string) => {
        setSelectedElement(element);
        console.log(`Selected element: ${element}`);
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
            <GameField selectedElement={selectedElement}/>
        </div>
    );
};

export default GlobalWindow;
