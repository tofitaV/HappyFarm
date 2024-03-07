import {useState} from 'react'
import './App.css'
import gifImage from './assets/cat.gif';

function App() {
    const [count, setCount] = useState(0)
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setCount((count) => count + 1)
        setClicked(true);
        setTimeout(() => setClicked(false), 100);
    };

    return (
        <div className="App">
            <div>
                <img src={gifImage}
                     alt="Cat gif"
                     onClick={handleClick}
                     style={{
                         cursor: 'pointer',
                         transform: clicked ? 'scale(1.1)' : 'scale(1)',
                         transition: 'transform 0.2s ease',
                     }}/>
            </div>
            <div className="card">
                <button>
                    Cat Coin you have earned is {count}!
                </button>
            </div>
        </div>
    )
}

export default App
