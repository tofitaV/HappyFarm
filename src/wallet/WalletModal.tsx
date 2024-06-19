import React, {useState} from "react";


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
                <h2>Wallet</h2>
                <div>
                    <span className="close" onClick={onClose}>&times;</span> {}
                    <button>Connect a wallet</button>
                </div>
            </div>
        </div>
    );
};