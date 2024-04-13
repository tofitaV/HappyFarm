import './Account.scss';
import {Account} from "./Plant/Account";
import React, {useContext} from "react";
import {plants} from "./enums/PlantsEnum";
import {coins} from "./enums/CoinsEnam";
import {MyContext} from "./contexts/AppContext";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    const filteredPlants = plants.filter((plant, index) => index !== plants.length - 1);
    const {tg, setTG} = useContext(MyContext)

    return (
        <div className='account'>
            <div>
                {filteredPlants.map((plant) => (
                <div className='account__plants' key={plant.id}>
                    <img src={plant.image} alt={plant.name}
                         style={{width: '30px', height: '30px', marginRight: '5px'}}/>
                    {account?.[`${plant.name.toLowerCase()}Count` as keyof Account]}
                </div>
            ))}
                <div className='account__plants'>
                    <img src={coins[0].image} alt={coins[0].name}
                         style={{width: '30px', height: '30px', marginRight: '5px'}}/>
                    {account?.coins}
                </div>
                <div>{"id " +tg.initDataUnsafe.user?.id}</div>
                <div>{"username " +tg.initDataUnsafe.user?.username}</div>
            </div>
        </div>

    );
}

export default AccountComponent;