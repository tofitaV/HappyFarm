import React, {useContext, useState} from 'react';
import './FloatingButton.css';
import {initCarrot} from "./Plant/Type/Carrot";
import {initPepper} from "./Plant/Type/Pepper";
import {MyContext} from "./contexts/AppContext";
import {DigUpAction} from "./Actions/DigUpAction";
import {HarvestAction} from "./Actions/HarvestAction";
import {ToWaterPlantAction} from "./Actions/ToWaterPlantAction";
import {PlantEnum} from "./Plant/PlantEnum";
import {initCorn} from "./Plant/Type/Corn";
import {initNothing} from "./Plant/Type/Nothing";
import {DoNothing} from "./Actions/DoNothing";


const FloatingButton: React.FC = () => {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showPlantStoreRow, setPlantStoreRow] = useState(false);

    const {action, setAction} = useContext(MyContext)
    const {plant, setPlant} = useContext(MyContext)


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
                        setPlant(initCorn)
                        setAction(new DoNothing())
                    }} className={plant.plantType == PlantEnum.Corn ? 'active' : ''}>
                        Corn 🌽
                    </button>
                    <button onClick={() => {
                        setPlant(initPepper)
                        setAction(new DoNothing())
                    }} className={plant.plantType == PlantEnum.Pepper ? 'active' : ''}>
                        Pepper 🫑
                    </button>
                    <button onClick={() => {
                        setPlant(initCarrot)
                        setAction(new DoNothing())
                    }} className={plant.plantType == PlantEnum.Carrot ? 'active' : ''}>
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
                    <button onClick={() => {
                        setAction(new ToWaterPlantAction())
                        setPlant(initNothing)
                    }} className={action instanceof ToWaterPlantAction ? 'active' : ''}>
                        Полить
                    </button>
                    <button onClick={() => {
                        setAction(new DigUpAction())
                        setPlant(initNothing)
                    }} className={action instanceof DigUpAction ? 'active' : ''}>
                        Выкопать
                    </button>
                    <button onClick={() => {
                        setAction(new HarvestAction())
                        setPlant(initNothing)
                    }} className={action instanceof HarvestAction ? 'active' : ''}>
                        Собрать урожай
                    </button>
                </div>
            )}
            <button onClick={()=>{
                setAction(new DoNothing())
                setPlant(initNothing)
            }}>
               Cancel
            </button>
        </div>
    );
};
export default FloatingButton;
