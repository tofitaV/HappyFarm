import React, {useEffect, useState} from 'react';
import './SpinWheel.scss';
import {Wheel} from "react-custom-roulette";
import {getDailySpin, getDailySpinRewards} from "../API/PlantAPI";
import {WheelData} from "react-custom-roulette/dist/components/Wheel/types";

interface SpinWheelModalProps {
    show: boolean;
    onClose: () => void;
}

const promptAlert: React.CSSProperties = {
    width: '20%',
    height: '20%'
}

//https://classic.yarnpkg.com/en/package/paramall-wheel-of-fortune
const SpinWheel: React.FC<SpinWheelModalProps> = ({show, onClose}) => {

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [data, setData] = useState<WheelData[]>([]);

    const handleSpinClick = async () => {
        await getDailySpin().then(res => setPrizeNumber(res))
        setMustSpin(true)
    }

    useEffect(() => {
        getDailySpinRewards().then(res => {
            const newData = res.map((item: string) => ({
                option: `${item}`
            }));
            setData(newData);
            console.log(newData)
        })
    }, []);

    const data1 = [
        {option: 'Corn 0',},
        {option: 'Pepper 1'},
        {option: 'Corn 2'},
        {option: 'Nothing 3'},
        {option: 'Corn 4'},
        {option: 'Carrot 5'},
        {option: 'Corn 6'},
        {option: 'Pepper 7'},
        {option: 'Corn 8'},
        {option: 'Nothing 9'}
    ]
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className={`modal-content`}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className='spin-container'>
                    <h1>Spin the Wheel</h1>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data1}
                        pointerProps={{style: promptAlert}}

                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                    <button onClick={handleSpinClick}>SPIN</button>
                </div>
            </div>
        </div>
    );
};

export default SpinWheel;
