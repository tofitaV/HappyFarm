import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GlobalWindow from "./GlobalWindows";
import {MyContextProvider} from "./contexts/AppContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <MyContextProvider>
          <GlobalWindow/>
      </MyContextProvider>
  </React.StrictMode>,
)

