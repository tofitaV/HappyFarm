import React, {useEffect, useState} from "react";
import {leagues} from "../enums/LeagueEnum";
import './League.scss';
import {getLeagueLeaders, myLeague} from "../API/PlantAPI";
import {LeagueUser} from "../Models/LeagueUser";

interface LeagueModalProps {
    show: boolean;
    onClose: () => void;
}

export const League: React.FC<LeagueModalProps> = ({show, onClose}) => {

    let league: LeagueUser[] = [];

    useEffect(() => {
        myLeague().then(res => {
            setCurrentLeagueIndex(res)
        })
        getLeagueLeaders({id: currentLeague.id}).then(res => league = res)
    }, []);

    const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);
    const [leagueLeaders, setLeagueLeaders] = useState<LeagueUser[]>(league);
    const currentLeague = leagues[currentLeagueIndex];
    const [timePeriod, setTimePeriod] = useState('week');

    const handlePrevLeague = () => {
        setCurrentLeagueIndex((prevIndex) => (prevIndex === 0 ? leagues.length - 1 : prevIndex - 1));
        getLeagueLeaders({id: currentLeague.id}).then(res => setLeagueLeaders(res))
    };

    const handleNextLeague = () => {
        const nextIndex = currentLeagueIndex === leagues.length - 1 ? 0 : currentLeagueIndex + 1;
        setCurrentLeagueIndex(nextIndex);
        getLeagueLeaders({id: leagues[nextIndex].id}).then(res => setLeagueLeaders(res));
    };


    const handleTimePeriodChange = (period: string) => {
        setTimePeriod(period);
    };

    const participants = timePeriod === 'week' ? leagueLeaders : leagueLeaders;
    return (

        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span> {}
                <div className="league-info">
                    <h2>{currentLeague.name} League</h2>
                </div>
                <div className="tabs">
                    <button onClick={handlePrevLeague}>{"<"}</button>
                    <img className="league-image" src={currentLeague.image} alt={currentLeague.name}/>
                    <button onClick={handleNextLeague}>{">"}</button>
                </div>
                <div className="player-list">
                    <h3>Players
                        - {timePeriod === 'week' ? 'Weekly' : 'Monthly'}</h3> {/* Отображение периода времени */}
                    <div className="tabs">
                        <button onClick={() => handleTimePeriodChange('week')}
                                className={timePeriod === 'week' ? 'active' : ''}>Weekly
                        </button>
                        <button onClick={() => handleTimePeriodChange('month')}
                                className={timePeriod === 'month' ? 'active' : ''}>Monthly
                        </button>
                    </div>
                    <div className="player-table">
                        {/* Вывод списка игроков в таблице */}
                        <table>
                            <thead>
                            <tr>
                                <th className="position-column">Place</th>
                                <th className="name-column"> Name</th>
                                <th className="coins-column"> Coins</th>
                            </tr>
                            </thead>
                            <tbody>
                            {participants.map((participant, index) => (
                                <tr key={index}>
                                    <td className="position-column">{index + 1}</td>
                                    <td className="name-column">{participant?.name}</td>
                                    <td className="coins-column">{participant?.coins}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}