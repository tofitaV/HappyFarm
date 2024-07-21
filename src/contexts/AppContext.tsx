    import React, { createContext, useState, ReactNode } from 'react';
    import {Action} from "../Actions/Action";
    import {DoNothing} from "../Actions/DoNothing";
    import {initNothing} from "../Plant/Type/Nothing";
    import {Account} from "../Plant/Account";
    import {TelegramWebApps} from "telegram-webapps";
    import {PlantModel} from "../Plant/PlantModel";

    interface ContextValueType {
        action: Action;
        plant: PlantModel;
        account: Account;
        tg: TelegramWebApps.WebApp
        setAction: React.Dispatch<React.SetStateAction<Action>>;
        setPlant: React.Dispatch<React.SetStateAction<PlantModel>>;
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
