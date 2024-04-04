import {PlantEnum} from "./Plant/PlantEnum";
import React, {useState} from "react";
import './PlantStoreModal.css';

interface PlantStoreModalProps {
    show: boolean;
    onClose: () => void;
    onSelectPlant: (plantType: PlantEnum) => void;
}


export const PlantStoreModal: React.FC<PlantStoreModalProps> = ({show, onClose, onSelectPlant}) => {
    const [plantOptions] = useState([
        {type: PlantEnum.Corn, label: 'Corn 🌽'},
        {type: PlantEnum.Pepper, label: 'Pepper 🫑'},
        {type: PlantEnum.Carrot, label: 'Carrot 🥕'}
    ]);

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Choose a Plant</h2>
                <div className="plant-options">
                    <span className="close" onClick={onClose}>&times;</span> {}
                    {plantOptions.map(option => (
                        <button key={option.type} onClick={() => onSelectPlant(option.type)}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};