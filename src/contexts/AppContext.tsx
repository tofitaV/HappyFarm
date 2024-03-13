    import React, { createContext, useState, ReactNode } from 'react';
    import {Action} from "../Actions/Action";
    import {DoNothing} from "../Actions/DoNothing";

    interface ContextValueType {
        action: Action;
        setAction: React.Dispatch<React.SetStateAction<Action>>;
    }

    const defaultValue: ContextValueType = {
        action: new DoNothing(),
        setAction: () => {}
    };

    const MyContext = createContext<ContextValueType>(defaultValue);

    const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [action, setAction] = useState<any>(null);

        return (
            <MyContext.Provider value={{ action, setAction }}>
                {children}
            </MyContext.Provider>
        );
    };

    export { MyContext, MyContextProvider };
