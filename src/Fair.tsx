import React, {useContext, useState} from "react";
import {PlantEnum} from "./Plant/PlantEnum";
import './Fair.scss';
import {sellPlants} from "./API/PlantAPI";
import {MyContext} from "./contexts/AppContext";
import AccountComponent from "./AccountComponent";

interface FairModalProps {
    show: boolean;
    onClose: () => void;
}


export const FairModal: React.FC<FairModalProps> = ({show, onClose}) => {
    const {account, setAccount} = useContext(MyContext)

    const [plantOptions] = useState([
        {id: 1, type: PlantEnum.Corn, label: '1🌽 -> 1🪙', coin: 1, plantCount: 1},
        {id: 2, type: PlantEnum.Corn, label: '10🌽 -> 12🪙', coin: 12, plantCount: 10},
        {id: 3, type: PlantEnum.Pepper, label: '1🫑 -> 10🪙', coin: 10, plantCount: 1},
        {id: 4, type: PlantEnum.Pepper, label: '10🫑 -> 140🪙', coin: 140, plantCount: 10},
        {id: 5, type: PlantEnum.Carrot, label: '1🥕 -> 5🪙', coin: 5, plantCount: 1},
        {id: 6, type: PlantEnum.Carrot, label: '10🥕 -> 80🪙', coin: 80, plantCount: 10}
    ]);

    const sell = (coins: any) => {
        sellPlants(coins).then(res => {
            setAccount(res)
        })
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <h2>Welcome to Your Fair!</h2>
                <div className='fair-account'>
                    <div>🌽: {account?.cornCount}</div>
                    <div>🥕: {account?.carrotCount}</div>
                    <div>🫑: {account?.pepperCount}</div>
                    <div>🪙: {account?.coins}</div>
                </div>
                <div className="fair-button">
                    <span className="close" onClick={onClose}>&times;</span> {}
                    {plantOptions.map(option => (
                        <button key={option.id} onClick={() => {
                            sell(option)
                        }}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};