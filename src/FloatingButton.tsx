import React, {useState} from 'react';
import './FloatingButton.css';
import {initCarrot} from "./Plant/Type/Carrot";
import {Plant} from "./Plant/Plants";
import {initCorn} from "./Plant/Type/Corn";
import {initPepper} from "./Plant/Type/Pepper";

interface Props {
    handleElementSelection: (plantType: Plant | undefined) => void;
    digUp: () => boolean;
    getWater: () => boolean;
    harvest: () => boolean;
}

const FloatingButton: React.FC<Props> = ({handleElementSelection, digUp, getWater, harvest}) => {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showPlantStoreRow, setPlantStoreRow] = useState(false);
    const [waterPressed, setWaterPressed] = useState(false);
    const [digUpPressed, setDigUpPressed] = useState(false);
    const [harvestPressed, setHarvestPressed] = useState(false);
    const [cornPressed, setCornPressed] = useState(false);
    const [pepperPressed, setPepperPressed] = useState(false);
    const [carrotPressed, setCarrotPressed] = useState(false);

    const toggleWater = () => {
        setWaterPressed(!waterPressed);
        getWater();
    };

    const toggleDigUp = () => {
        setDigUpPressed(!digUpPressed);
        digUp();
    };

    const toggleHarvest = () => {
        setHarvestPressed(!harvestPressed);
        harvest();
    };

    const toggleCorn = () => {
        setCornPressed(!cornPressed);
    };

    const toggleCarrot = () => {
        setCarrotPressed(!carrotPressed);
    };

    const togglePepper = () => {
        setPepperPressed(!pepperPressed);
    };

    const toggleSecondRow = () => {
        setShowSecondRow(!showSecondRow);
    };
    const togglePlantStoreRow = () => {
        setPlantStoreRow(!showPlantStoreRow);
    };


    return (
        <div className="action-buttons">
            <button onClick={togglePlantStoreRow}>
                {showPlantStoreRow ? 'Hide plants' : 'Show plants'}
            </button>
            {/* Second row of buttons */}
            {showPlantStoreRow && (
                <div style={{marginTop: '1px'}}>
                    <button onClick={() => {
                        toggleCorn()
                        !cornPressed ? handleElementSelection(initCorn()) : handleElementSelection(undefined)
                    }} className={cornPressed ? 'active' : ''}>
                        Corn 🌽
                    </button>
                    <button onClick={() => {
                        togglePepper()
                        !pepperPressed ? handleElementSelection(initPepper()) : handleElementSelection(undefined)
                    }} className={pepperPressed ? 'active' : ''}>
                        Pepper 🫑
                    </button>
                    <button onClick={() => {
                        toggleCarrot()
                        !carrotPressed ? handleElementSelection(initCarrot()) : handleElementSelection(undefined)
                    }} className={carrotPressed ? 'active' : ''}>
                        Carrot 🥕
                    </button>
                </div>
            )}
            <button onClick={toggleSecondRow}>
                {showSecondRow ? 'Hide Action' : 'Show Action'}
            </button>
            {/* Second row of buttons */}
            {showSecondRow && (
                <div style={{marginTop: '1px'}}>
                    <button onClick={toggleWater} className={waterPressed ? 'active' : ''}>
                        Полить
                    </button>
                    <button onClick={toggleDigUp} className={digUpPressed ? 'active' : ''}>
                        Выкопать
                    </button>
                    <button onClick={toggleHarvest} className={harvestPressed ? 'active' : ''}>
                        Собрать урожай
                    </button>
                </div>
            )}
        </div>
    );
};
export default FloatingButton;
