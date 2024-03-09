import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameField from "./GameField";
import FloatingButton from "./FloatingButton";
import GlobalWindow from "./GlobalWindows";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <GlobalWindow/>
  </React.StrictMode>,
)

