import './Account.scss';
import {Account} from "./Plant/Account";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWallet} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from "react";
import {plants} from "./enums/PlantsEnum";
import {coins} from "./enums/CoinsEnam";
import {WalletModal} from "./wallet/WalletModal";
import ReactDOM from 'react-dom';
import {TonConnectButton} from "@tonconnect/ui-react";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    const [token, setToken] = useState<string | null>(null);
    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);

    const [showWalletModal, setShowWalletModal] = useState(false);

    const toggleWallet = () => {
        setShowWalletModal(!showWalletModal);
    };

    return (
        <>
            <div className='account'>
                <div>
                    {filteredPlants.map((plant) => (
                        <div className='account__plants' key={plant.id}>
                            <img src={plant.image} alt={plant.name} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                            {account?.[`${plant.name.toLowerCase()}Count` as keyof Account]}
                        </div>
                    ))}
                    <div className='account__plants'>
                        <img src={coins[0].image} alt={coins[0].name} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                        {account?.coins}
                    </div>
                </div>
                    <TonConnectButton/>
                    <div className='account__wallet'>
                        <button className='wallet__button' onClick={toggleWallet}>
                            <FontAwesomeIcon icon={faWallet} style={{color: "#74C0FC"}}/>
                        </button>
                    </div>
                    {ReactDOM.createPortal(
                        <WalletModal
                            show={showWalletModal}
                            onClose={toggleWallet}
                        />,
                        document.body
                    )}
            </div>
        </>
    );
}

export default AccountComponent;