import React, { useContext, useState } from 'react';
import './FloatingButton.css';
import { initCarrot } from './Plant/Type/Carrot';
import { initPepper } from './Plant/Type/Pepper';
import { MyContext } from './contexts/AppContext';
import { DigUpAction } from './Actions/DigUpAction';
import { HarvestAction } from './Actions/HarvestAction';
import { ToWaterPlantAction } from './Actions/ToWaterPlantAction';
import { PlantEnum } from './Plant/PlantEnum';
import { initCorn } from './Plant/Type/Corn';
import { initNothing } from './Plant/Type/Nothing';
import { DoNothing } from './Actions/DoNothing';
interface PlantStoreModalProps {
    show: boolean;
    onClose: () => void;
    onSelectPlant: (plantType: PlantEnum) => void;
}


const PlantStoreModal: React.FC<PlantStoreModalProps> = ({ show, onClose, onSelectPlant }) => {
    const [plantOptions] = useState([
        { type: PlantEnum.Corn, label: 'Corn 🌽' },
        { type: PlantEnum.Pepper, label: 'Pepper 🫑' },
        { type: PlantEnum.Carrot, label: 'Carrot 🥕' }
    ]);

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Choose a Plant</h2>
                <div className="plant-options">
                    <span className="close" onClick={onClose}>&times;</span> {/* Close button */}
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

const FloatingButton: React.FC = () => {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showPlantStoreModal, setShowPlantStoreModal] = useState(false);

    const { action, setAction, plant, setPlant } = useContext(MyContext);

    const toggleSecondRow = () => {
        setShowSecondRow(!showSecondRow);
    };

    const togglePlantStore = () => {
        setShowPlantStoreModal(!showPlantStoreModal);
    };

    const handleSelectPlant = (plantType: PlantEnum) => {
        if (plantType === PlantEnum.Corn) {
            setPlant(initCorn);
        } else if (plantType === PlantEnum.Pepper) {
            setPlant(initPepper);
        } else if (plantType === PlantEnum.Carrot) {
            setPlant(initCarrot);
        }
        setAction(new DoNothing());
        setShowPlantStoreModal(false);
    };

    return (
        <div>
            <div className="action-buttons">
                <button onClick={togglePlantStore}>
                    {'STORE'}
                </button>
                {showSecondRow && (
                    <div style={{ marginTop: '1px' }}>
                        <button onClick={() => {
                            setAction(new ToWaterPlantAction());
                            setPlant(initNothing);
                        }} className={action instanceof ToWaterPlantAction ? 'active' : ''}>
                            Полить
                        </button>
                        <button onClick={() => {
                            setAction(new DigUpAction());
                            setPlant(initNothing);
                        }} className={action instanceof DigUpAction ? 'active' : ''}>
                            Выкопать
                        </button>
                        <button onClick={() => {
                            setAction(new HarvestAction());
                            setPlant(initNothing);
                        }} className={action instanceof HarvestAction ? 'active' : ''}>
                            Собрать урожай
                        </button>
                    </div>
                )}
                <button onClick={toggleSecondRow}>
                    {showSecondRow ? 'Hide Action' : 'Show Action'}
                </button>
                <button onClick={() => {
                    setAction(new DoNothing());
                    setPlant(initNothing);
                }}>
                    Cancel
                </button>
            </div>
            {/* Modal should be rendered here, outside the button wrapper */}
            <PlantStoreModal
                show={showPlantStoreModal}
                onClose={togglePlantStore}
                onSelectPlant={handleSelectPlant}
            />
        </div>
    );
};

export default FloatingButton;
