import {PlantEnum} from "./Plant/PlantEnum";
import React, {useState} from "react";
import './PlantStoreModal.scss';
import {plants} from "./enums/PlantsEnum";

interface PlantStoreModalProps {
    show: boolean;
    onClose: () => void;
    onSelectPlant: (plantType: PlantEnum) => void;
}


export const PlantStoreModal: React.FC<PlantStoreModalProps> = ({show, onClose, onSelectPlant}) => {
    // const [plantOptions] = useState([
    //     {type: PlantEnum.Corn, label: 'Corn 🌽'},
    //     {type: PlantEnum.Pepper, label: 'Pepper 🫑'},
    //     {type: PlantEnum.Carrot, label: 'Carrot 🥕'}
    // ]);

    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Choose a Plant</h2>
                <div className="plant-options">
                    <span className="close" onClick={onClose}>&times;</span> {}
                    {filteredPlants.map(option => (
                        <button className="plant-options__btn" key={option.type} onClick={() => onSelectPlant(option.type)}>
                            <img src={option.image} alt={option.name} style={{marginRight: '5px'}}/>
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};