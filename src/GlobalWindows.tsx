import React, {useState} from 'react';
import FloatingButton from './FloatingButton';
import GameField from "./GameField";

const GlobalWindow = () => {
    const [selectedElement, setSelectedElement] = useState<string>('');

    const handleElementSelection = (element: string) => {
        setSelectedElement(element);
        console.log(`Selected element: ${element}`);
    };

    return (
        <div>
            <FloatingButton
                handleElementSelection={handleElementSelection}
            />
            <GameField selectedElement={selectedElement}/>
        </div>
    );
};

export default GlobalWindow;
