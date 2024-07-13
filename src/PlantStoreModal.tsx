import {PlantEnum} from "./Plant/PlantEnum";
import React, {useContext, useState} from "react";
import './PlantStoreModal.scss';
import {plants} from "./enums/PlantsEnum";
import {coins} from "./enums/CoinsEnam";
import {useIsConnectionRestored, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {MyContext} from "./contexts/AppContext";

interface PlantStoreModalProps {
    show: boolean;
    onClose: () => void;
    onSelectPlant: (plantType: PlantEnum) => void;
}


export const PlantStoreModal: React.FC<PlantStoreModalProps> = ({show, onClose, onSelectPlant}) => {
    const [txInProgress, setTxInProgress] = useState(false);
    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);
    const [tonConnectUI] = useTonConnectUI();
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const {account, setAccount} = useContext(MyContext)

    let content: string;
    switch (true) {
        case !isConnectionRestored:
            content = 'Loading...';
            break;
        case txInProgress:
            content = 'Tx in progress';
            break;
        case !!wallet:
            content = 'Send transaction';
            break;
        default:
        case !wallet:
            content = 'Connect Wallet';
            break;
    }

    const buyThousandOfCoins = async () => {
        if (!wallet) {
            tonConnectUI.openModal();
        } else {
            setTxInProgress(true)
            try {

                var res = await tonConnectUI.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 360,
                    messages: [
                        {
                            amount: '1000000',
                            address: '0:07e85dfff3bbe1513595c74d06393373561628ff0bc981d21cae310c8645e095'
                        }
                    ]
                });
                //send boc to back-end and check the result and add coins to account
            } catch (e) {
                console.log(e);
            }

            setTxInProgress(false)
        }
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Choose a Plant</h2>
                <div className="plant-options">
                    <span className="close" onClick={onClose}>&times;</span> {}
                    {filteredPlants.map(option => (
                        <button className="plant-options__btn" key={option.type}
                                onClick={() => onSelectPlant(option.type)}>
                            <img src={option.image} alt={option.name} style={{marginRight: '5px'}}/>
                            {option.name}
                        </button>
                    ))}
                    <button disabled={!isConnectionRestored || txInProgress} onClick={buyThousandOfCoins}>
                        <img src={coins[0].image} alt={coins[0].name}
                             style={{marginRight: '5px'}}/>
                        1000
                    </button>
                </div>
            </div>
        </div>
    );
};