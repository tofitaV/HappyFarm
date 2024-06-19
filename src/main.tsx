import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import GlobalWindow from "./GlobalWindows";
import {MyContextProvider} from "./contexts/AppContext";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <TonConnectUIProvider
            manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
            language="en"
            uiPreferences={{theme: 'SYSTEM'}}
        >
            <MyContextProvider>
                <GlobalWindow/>
            </MyContextProvider>
        </TonConnectUIProvider>
    </React.StrictMode>,
)

