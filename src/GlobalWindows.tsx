import FloatingButton from './FloatingButton';
import GameField from "./GameField";

const GlobalWindow = () => {

    return (
        <div className='global-window' style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '100vh'
        }}>
            <FloatingButton/>
            <GameField/>
        </div>
    );
};

export default GlobalWindow;
