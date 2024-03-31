import FloatingButton from './FloatingButton';
import GameField from "./GameField";
import "./GlobalWindow.css"; // Import the CSS file

const GlobalWindow = () => {
    return (<div className='background-image'>
        <div className='field-wrapper'>
            <div className='global-window'>
                <GameField/>
            </div>
        </div>
        <FloatingButton/>
    </div>);
};

export default GlobalWindow;
