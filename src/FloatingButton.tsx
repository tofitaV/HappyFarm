import React, {useContext, useState} from 'react';
import './FloatingButton.css';
import {initCarrot} from "./Plant/Type/Carrot";
import {Plant} from "./Plant/Plants";
import {initCorn} from "./Plant/Type/Corn";
import {initPepper} from "./Plant/Type/Pepper";
import {MyContext} from "./contexts/AppContext";
import {DoNothing} from "./Actions/DoNothing";
import {DigUpAction} from "./Actions/DigUpAction";
import {HarvestAction} from "./Actions/HarvestAction";
import {ToWaterPlantAction} from "./Actions/ToWaterPlantAction";

interface Props {
    handleElementSelection: (plantType: Plant) => void;
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

    const { action, setAction } = useContext(MyContext)

    const toggleWater = () => {
        setWaterPressed(!waterPressed);
        setAction(new ToWaterPlantAction())
        getWater();
    };

    const toggleDigUp = () => {
        setDigUpPressed(!digUpPressed);
        setAction(new DigUpAction())
        digUp();
    };

    const toggleHarvest = () => {
        setHarvestPressed(!harvestPressed);
        setAction(new HarvestAction())
        harvest();
    };

    const toggleCorn = () => {
        setCornPressed(!cornPressed);
        setAction(new DoNothing())
    };

    const toggleCarrot = () => {
        setCarrotPressed(!carrotPressed);
        setAction(new DoNothing())
    };

    const togglePepper = () => {
        setPepperPressed(!pepperPressed);
        setAction(new DoNothing())
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
                        !cornPressed ? handleElementSelection(initCorn()) : ''
                    }} className={cornPressed ? 'active' : ''}>
                        Corn 🌽
                    </button>
                    <button onClick={() => {
                        togglePepper()
                        !pepperPressed ? handleElementSelection(initPepper()) : ''
                    }} className={pepperPressed ? 'active' : ''}>
                        Pepper 🫑
                    </button>
                    <button onClick={() => {
                        toggleCarrot()
                        !carrotPressed ? handleElementSelection(initCarrot()) : ''
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
