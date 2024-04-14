import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import GlobalWindow from "./GlobalWindows";
import {MyContextProvider} from "./contexts/AppContext";
import axios from "axios";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <MyContextProvider>
          <GlobalWindow/>
      </MyContextProvider>
  </React.StrictMode>,
)

