import React, {useContext, useEffect, useState} from 'react';
import './SpinWheel.scss';
import {Wheel} from "react-custom-roulette";
import {getDailySpin, getDailySpinRewards, getDepot, getSpinsStatus, purchaseSpin} from "../API/PlantAPI";
import {WheelData} from "react-custom-roulette/dist/components/Wheel/types";
import {WheelPrize} from "./WheelPrize";
import {MyContext} from "../contexts/AppContext";
import {SpinStatus} from "../Models/SpinStatus";

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

    const {account, setAccount} = useContext(MyContext)
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [data, setData] = useState<WheelData[]>([{option: ''}]);
    const [showModal, setShowModal] = useState(false);
    const [winningPrize, setWinningPrize] = useState('');
    const [wheelPrizes, setWheelPrizes] = useState<WheelPrize[]>([]);
    const [spinStatus, setSpinStatus] = useState<SpinStatus>();

    const handleSpinClick = async () => {
        await getDailySpin().then(res => {
            const i: number = wheelPrizes.findIndex(e => e.id == res.id);
            setPrizeNumber(i);
            setWinningPrize(data[i].option || 'Error, try again')
            setMustSpin(true);
        })
    }

    useEffect(() => {
        getDailySpinRewards().then(res => {
            const wheelPrizes: WheelPrize[] = res;
            setWheelPrizes(wheelPrizes)
            let newData = wheelPrizes.map((item: WheelPrize) => ({
                option: `${item.prizeCount} ${item.prizeName}`
            }));

            newData = newData.map(item => {
                item = applyStyle(item, 'Coins', '#9d00ff');
                item = applyStyle(item, 'Corn', '#e7e013');
                item = applyStyle(item, 'Pepper', '#9bdb7a');
                item = applyStyle(item, 'Carrot', '#e18819');
                return item;
            });

            setData(newData);
        })
    }, []);

    const applyStyle = (item: any, searchString: string, color: string) => {
        if (item.option.includes(searchString)) {
            return {
                ...item,
                style: {backgroundColor: color}
            };
        }
        return item;
    };

    useEffect(() => {
        if (!mustSpin && prizeNumber !== 0) {
            setShowModal(true);
        }
    }, [mustSpin, prizeNumber]);

    const closeModal = () => {
        setShowModal(false);
        getDepot().then((res) => {
            setAccount(res)
        })
    };

    const buySpin = async () => {
        await purchaseSpin().then(r => r);
        await getSpinsStatus().then((res) => {
            setSpinStatus(res)
        })
    };


    useEffect(() => {
        getSpinsStatus().then((res) => {
            setSpinStatus(res)
        })
    }, [show, mustSpin]);


    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className={`modal-content`}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className='spin-container'>
                    <h1>Spin the Wheel</h1>
                    <div>Available spins: {spinStatus?.availableSpins}</div>
                    <div>Free spins: {spinStatus?.hasFreeSpin ? "no" : "yes"}</div>
                    <div className='spin-bounce'>
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}
                            pointerProps={{style: promptAlert}}
                            onStopSpinning={() => {
                                setMustSpin(false);
                            }}
                        />
                    </div>
                    <button onClick={handleSpinClick} disabled={mustSpin}>SPIN</button>
                    <button onClick={buySpin}>Purchase Spin</button>
                    {showModal && (
                        <div className="custom-modal-overlay" onClick={closeModal}>
                            <div className="custom-modal-box" onClick={(e) => e.stopPropagation()}>
                                <h2>Congratulations!</h2>
                                <p>You won: {winningPrize}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpinWheel;
