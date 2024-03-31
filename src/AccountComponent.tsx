import './Account.css';
import {Account} from "./Plant/Account";
import React from "react";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    return (

            //<div className='warehouse'>
                <div className='account'>
                    <div>🌽: {account?.cornCount}</div>
                    <div>🥕: {account?.carrotCount}</div>
                    <div>🫑: {account?.pepperCount}</div>
                    <div>🪙: {account?.coins}</div>
                </div>
            //</div>

    );
}

export default AccountComponent;