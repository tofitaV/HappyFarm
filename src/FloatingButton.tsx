import React, {useState} from 'react';
import {Plant} from "./Plants";
import './FloatingButton.css';

interface Props {
    handleElementSelection: (plant: Plant) => void;
}

const FloatingButton: React.FC<Props> = ({handleElementSelection}) => {
    const [showSecondRow, setShowSecondRow] = useState(false);

    const toggleSecondRow = () => {
        setShowSecondRow(!showSecondRow);
    };

    return (
        <div className="action-buttons">
            <button onClick={() => handleElementSelection({name: 'corn', dateTime: new Date()})}>
                Corn 🌽
            </button>
            <button onClick={() => handleElementSelection({name: 'paper', dateTime: new Date()})}>
                Paper 🫑
            </button>
            <button onClick={() => handleElementSelection({name: 'carrot', dateTime: new Date()})}>
                Carrot 🥕
            </button>
            <button onClick={toggleSecondRow}>
                {showSecondRow ? 'Hide Action' : 'Show Action'}
            </button>
            {/* Second row of buttons */}
            {showSecondRow && (
                <div style={{marginTop: '1px'}}>
                    <button onClick={() => handleElementSelection({name: 'corn', dateTime: new Date()})}>
                        Полить
                    </button>
                    <button onClick={() => handleElementSelection({name: 'corn', dateTime: new Date()})}>
                        Выкопать
                    </button>
                    <button onClick={() => handleElementSelection({name: 'corn', dateTime: new Date()})}>
                        Что-то ещё
                    </button>
                </div>
            )}
        </div>
    );
};
export default FloatingButton;
