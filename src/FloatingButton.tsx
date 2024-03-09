import React, {useState} from 'react';

interface Props {
    handleElementSelection: (element: string) => void;
}

const FloatingButton: React.FC<Props> = ({handleElementSelection}) => {

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            textAlign: 'center'
        }}>
            <button onClick={() => handleElementSelection('corn')}>
                Corn 🌽
            </button>
            <button onClick={() => handleElementSelection('paper')}>
                Paper 🫑
            </button>
            <button onClick={() => handleElementSelection('carrot')}>
                Carrot 🥕
            </button>
        </div>
    );
};
export default FloatingButton;
