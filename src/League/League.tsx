import React, { useEffect, useState } from "react";
import { leagues } from "../enums/LeagueEnum";
import './League.scss';
import { getLeagueLeaders, myLeague } from "../API/PlantAPI";
import { LeagueUser } from "../Models/LeagueUser";

interface LeagueModalProps {
    show: boolean;
    onClose: () => void;
}

export const League: React.FC<LeagueModalProps> = ({ show, onClose }) => {

    const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);
    const [leagueLeaders, setLeagueLeaders] = useState<LeagueUser[]>([]);
    const [timePeriod, setTimePeriod] = useState('week');

    useEffect(() => {
        myLeague().then(res => {
            setCurrentLeagueIndex(res);
        });
    }, []);

    useEffect(() => {
        if (currentLeagueIndex !== null) {
            getLeagueLeaders({ id: leagues[currentLeagueIndex]?.id }).then(res => setLeagueLeaders(res));
        }
    }, [show, currentLeagueIndex]);

    const currentLeague = leagues[currentLeagueIndex];

    const handlePrevLeague = () => {
        setCurrentLeagueIndex(prevIndex => (prevIndex === 0 ? 0 : prevIndex - 1));
    };

    const handleNextLeague = () => {
        setCurrentLeagueIndex(prevIndex => (prevIndex === leagues.length - 1 ? prevIndex : prevIndex + 1));
    };

    const handleTimePeriodChange = (period: string) => {
        setTimePeriod(period);
    };

    const participants = timePeriod === 'week' ? leagueLeaders : leagueLeaders;

    if (currentLeague.id == 69) {
        return <div className="auth-failed">Opppss... Please log in again.</div>;
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span> {}
                <div className="league-info">
                    <h2>{currentLeague?.name} League</h2>
                </div>
                <div className="tabs">
                    <button onClick={handlePrevLeague}>{"<"}</button>
                    <img className="league-image" src={currentLeague?.image} alt={currentLeague?.name} />
                    <button onClick={handleNextLeague}>{">"}</button>
                </div>
                <div className="player-list">
                    <div className="player-table">
                        <table>
                            <thead>
                            <tr>
                                <th className="position-column">Place</th>
                                <th className="name-column">Name</th>
                                <th className="coins-column">Coins</th>
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
