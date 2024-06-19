import './WalletModal.scss';
import React, {useState} from "react";
import {AddressInfo} from "./AddressInfo";
import {WalletInfo} from "./WalletInfo";
import {SendTx} from "./SendTx";
import {Settings} from "./Settings";
import {BackendDemoApi} from "./BackendDemoApi";
interface WalletModalProps {
    show: boolean;
    onClose: () => void;
}


export const WalletModal: React.FC<WalletModalProps> = ({show, onClose}) => {
    if (!show) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content" onClick={handleContentClick}>
                <span className="close" onClick={onClose}>&times;</span> {}
                <h2>Wallet</h2>
                <div style={{height: '140px'}}>
                    <AddressInfo/>
                    <WalletInfo/>
                </div>
                <SendTx/>
                <Settings/>
                <BackendDemoApi/>
            </div>
        </div>
    );
};