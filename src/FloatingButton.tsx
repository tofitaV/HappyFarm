import React, { useContext, useState } from 'react';
import './FloatingButton.scss';
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
import { FairModal } from './Fair';
import { PlantStoreModal } from './PlantStoreModal';
import { League } from './League/League';
import SpinWheel from './DailyActivity/SpinWheel';
import { WalletModal } from './wallet/WalletModal';
import FriendsList from './Friends/FriendsList';

const FloatingButton: React.FC = () => {
    const [showPlantStoreModal, setShowPlantStoreModal] = useState(false);
    const [showFairModal, setShowFairModal] = useState(false);
    const [showLeagueModal, setShowLeagueModal] = useState(false);
    const [showFriendsModal, setShowFriendsModal] = useState(false);

    const { action, setAction, plant, setPlant } = useContext(MyContext);

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
            <div className="action-buttons-container">
                <div className="action-buttons">
                    <button
                        onClick={() => {
                            setAction(new ToWaterPlantAction());
                            setPlant(initNothing);
                        }}
                        className={`action-button ${action instanceof ToWaterPlantAction ? 'active' : ''}`}
                    >
                        💧
                    </button>
                    <button
                        onClick={() => {
                            setAction(new DigUpAction());
                            setPlant(initNothing);
                        }}
                        className={`action-button ${action instanceof DigUpAction ? 'active' : ''}`}
                    >
                        🚮
                    </button>
                    <button
                        onClick={() => {
                            setAction(new HarvestAction());
                            setPlant(initNothing);
                        }}
                        className={`action-button ${action instanceof HarvestAction ? 'active' : ''}`}
                    >
                        🌾
                    </button>
                    <button
                        onClick={() => {
                            setAction(new DoNothing());
                            setPlant(initNothing);
                        }}
                        className="action-button"
                    >
                        ❌
                    </button>
                </div>
            </div>
            <div className="navigation-menu">
                <button
                    onClick={togglePlantStore}
                    className="navigation-button"
                >
                    🛒
                    <div className="navigation-label">Store</div>
                </button>
                <button
                    onClick={toggleFair}
                    className="navigation-button"
                >
                    🎪
                    <div className="navigation-label">Fair</div>
                </button>
                <button
                    onClick={toggleLeague}
                    className="navigation-button"
                >
                    🏆
                    <div className="navigation-label">League</div>
                </button>
                <button
                    onClick={toggleFriendsList}
                    className="navigation-button"
                >
                    👥
                    <div className="navigation-label">Friends</div>
                </button>
            </div>
            <PlantStoreModal
                show={showPlantStoreModal}
                onClose={togglePlantStore}
                onSelectPlant={handleSelectPlant}
            />
            <FairModal show={showFairModal} onClose={toggleFair} />
            <League show={showLeagueModal} onClose={toggleLeague} />
            <FriendsList show={showFriendsModal} onClose={toggleFriendsList} />
        </div>
    );
};

export default FloatingButton;
