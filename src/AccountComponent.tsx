import './Account.scss';
import {Account} from "./Plant/Account";
import React, {useState} from "react";
import {FairModal} from "./Fair";
import {League} from "./League/League";
import {plants} from "./enums/PlantsEnum";
import {coins} from "./enums/CoinsEnam";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);

    return (

        <div className='account'>
            {filteredPlants.map((plant) => (
                <div className='account__plants' key={plant.id}>
                    <img src={plant.image} alt={plant.name} style={{ width: '30px', height: '30px',  marginRight: '5px' }} />
                    {account?.[`${plant.name.toLowerCase()}Count` as keyof Account]}
                </div>
            ))}
            <div className='account__plants'>
                <img src={coins[0].image} alt={coins[0].name} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                {account?.coins}
            </div>
        </div>

    );
}

export default AccountComponent;