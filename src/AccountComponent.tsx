import './Account.css';
import {Account} from "./Plant/Account";
import React, {useState} from "react";
import {FairModal} from "./Fair";
import {League} from "./League/League";

interface AccountProps {
    account: Account | undefined;
}

const AccountComponent: React.FC<AccountProps> = ({account}) => {
    return (

        <div className='account'>
            <div>🌽: {account?.cornCount}</div>
            <div>🥕: {account?.carrotCount}</div>
            <div>🫑: {account?.pepperCount}</div>
            <div>🪙: {account?.coins}</div>
        </div>

    );
}

export default AccountComponent;