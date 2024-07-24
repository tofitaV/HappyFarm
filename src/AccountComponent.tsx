import './Account.scss';
import {Account} from "./Plant/Account";
import React, {useState} from "react";
import {plants} from "./enums/PlantsEnum";
import {coins} from "./enums/CoinsEnam";
import ReactDOM from 'react-dom';
import {TonConnectButton} from "@tonconnect/ui-react";
import SpinWheel from "./DailyActivity/SpinWheel";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    const [token, setToken] = useState<string | null>(null);
    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);

    const [showWalletModal, setShowWalletModal] = useState(false);
    const [showSpinWheelModal, setShowSpinWheelModal] = useState(false);
    const toggleWallet = () => {
        setShowWalletModal(!showWalletModal);
    };

    const toggleSpinWheel = () => {
        setShowSpinWheelModal(!showSpinWheelModal);
    };
    return (
        <>
            <div className='account'>
                <div>
                    {filteredPlants.map((plant) => (
                        <div className='account__plants' key={plant.id}>
                            <img src={plant.image} alt={plant.name} className='account__plants__img'/>
                            {account?.[`${plant.name.toLowerCase()}Count` as keyof Account]}
                        </div>
                    ))}
                    <div className='account__plants'>
                        <img className='account__plants__img' src={coins[0].image} alt={coins[0].name}/>
                        {account?.coins}
                    </div>
                </div>
                <TonConnectButton/>
                <button onClick={toggleSpinWheel} className="spin-button">
                    <img className="spin-button-img" src={new URL("/assets/spin.gif", import.meta.url).href}
                         alt="Spin Button"/>
                </button>

                {ReactDOM.createPortal(
                    <SpinWheel
                        show={showSpinWheelModal}
                        onClose={toggleSpinWheel}
                    />,
                    document.body
                )}
                {/*<div className='account__wallet'>
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
                    )}*/}
            </div>
        </>
    );
}

export default AccountComponent;