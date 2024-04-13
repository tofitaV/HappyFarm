    import React, { createContext, useState, ReactNode } from 'react';
    import {Action} from "../Actions/Action";
    import {DoNothing} from "../Actions/DoNothing";
    import {Plant} from "../Plant/Plants";
    import {initCarrot} from "../Plant/Type/Carrot";
    import {initCorn} from "../Plant/Type/Corn";
    import {initNothing} from "../Plant/Type/Nothing";
    import {Account} from "../Plant/Account";
    import {getDepot} from "../API/PlantAPI";
    import {TelegramWebApps} from "telegram-webapps";

    interface ContextValueType {
        action: Action;
        plant: Plant;
        account: Account;
        tg: TelegramWebApps.WebApp
        setAction: React.Dispatch<React.SetStateAction<Action>>;
        setPlant: React.Dispatch<React.SetStateAction<Plant>>;
        setAccount: React.Dispatch<React.SetStateAction<Account>>;
        setTG: React.Dispatch<React.SetStateAction<TelegramWebApps.WebApp>>;
    }

    const defaultValue: ContextValueType = {
        action: new DoNothing(),
        plant: initNothing(),
        account: {} as Account,
        tg: {} as TelegramWebApps.WebApp,
        setAction: () => {},
        setPlant: () => {},
        setAccount: () => {},
        setTG: () => {},

    };

    const MyContext = createContext<ContextValueType>(defaultValue);

    const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [action, setAction] = useState<any>(new DoNothing());
        const [plant, setPlant] = useState<any>(initNothing());
        const [account, setAccount] = useState<any>({} as Account);
        const [tg, setTG] = useState<any>(Telegram.WebApp);
        return (
            <MyContext.Provider value={{ action, plant, account, tg, setAction, setPlant, setAccount, setTG}}>
                {children}
            </MyContext.Provider>
        );
    };

    export { MyContext, MyContextProvider };
