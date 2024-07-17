import React, {useContext, useState} from 'react';
import './FloatingButton.scss';
import {initCarrot} from './Plant/Type/Carrot';
import {initPepper} from './Plant/Type/Pepper';
import {MyContext} from './contexts/AppContext';
import {DigUpAction} from './Actions/DigUpAction';
import {HarvestAction} from './Actions/HarvestAction';
import {ToWaterPlantAction} from './Actions/ToWaterPlantAction';
import {PlantEnum} from './Plant/PlantEnum';
import {initCorn} from './Plant/Type/Corn';
import {initNothing} from './Plant/Type/Nothing';
import {DoNothing} from './Actions/DoNothing';
import {FairModal} from "./Fair";
import {PlantStoreModal} from "./PlantStoreModal";
import {League} from "./League/League";
import SpinWheel from "./DailyActivity/SpinWheel";
import {WalletModal} from "./wallet/WalletModal";
import FriendsList from "./Friends/FriendsList";


const FloatingButton: React.FC = () => {
    const [showSecondRow, setShowSecondRow] = useState(false);
    const [showPlantStoreModal, setShowPlantStoreModal] = useState(false);
    const [showFairModal, setShowFairModal] = useState(false);
    const [showLeagueModal, setShowLeagueModal] = useState(false);
    const [showFriendsModal, setShowFriendsModal] = useState(false);

    const {action, setAction, plant, setPlant} = useContext(MyContext);

    const toggleSecondRow = () => {
        setShowSecondRow(!showSecondRow);
    };

    const togglePlantStore = () => {
        setShowPlantStoreModal(!showPlantStoreModal);
    };

    const toggleFair = () => {
        setShowFairModal(!showFairModal);
    };

    const toggleLeague = () => {
        setShowLeagueModal(!showLeagueModal);
    };
    const toggleFriendsList = () => {
        setShowFriendsModal(!showFriendsModal);
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
                {showSecondRow && (
                    <div style={{marginTop: '1px'}}>
                        <button onClick={() => {
                            setAction(new ToWaterPlantAction());
                            setPlant(initNothing);
                        }} className={action instanceof ToWaterPlantAction ? 'active' : ''}>
                            To water
                        </button>
                        <button onClick={() => {
                            setAction(new DigUpAction());
                            setPlant(initNothing);
                        }} className={action instanceof DigUpAction ? 'active' : ''}>
                            Dig up
                        </button>
                        <button onClick={() => {
                            setAction(new HarvestAction());
                            setPlant(initNothing);
                        }} className={action instanceof HarvestAction ? 'active' : ''}>
                            Harvest
                        </button>
                    </div>
                )}
                <button onClick={togglePlantStore}>
                    {'Store'}
                </button>
                <button onClick={toggleFair}>
                    {'Fair'}
                </button>
                <button onClick={toggleLeague}>
                    {'League'}
                </button>
                <button onClick={toggleFriendsList}>
                    {'Friends'}
                </button>
                <button onClick={toggleSecondRow}>
                    {showSecondRow ? 'Action' : 'Action'}
                </button>
                <button onClick={() => {
                    setAction(new DoNothing());
                    setPlant(initNothing);
                }}>
                    Clear
                </button>
            </div>
            {/* Modal should be rendered here, outside the button wrapper */}
            <PlantStoreModal
                show={showPlantStoreModal}
                onClose={togglePlantStore}
                onSelectPlant={handleSelectPlant}
            />
            <FairModal
                show={showFairModal}
                onClose={toggleFair}
            />
            <League
                show={showLeagueModal}
                onClose={toggleLeague}
            />
            <FriendsList
                show={showFriendsModal}
                onClose={toggleFriendsList}
            />
        </div>
    );
};

export default FloatingButton;
