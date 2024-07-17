import './FriendsList.scss';
import React, {useContext, useEffect, useState} from "react";
import {LeagueUser} from "../Models/LeagueUser";
import {getMyFriends} from "../API/PlantAPI";
import {Friend} from "../Models/Friend";
import {MyContext} from "../contexts/AppContext";

interface FriendsListModalProps {
    show: boolean;
    onClose: () => void;
}


const FriendsList: React.FC<FriendsListModalProps> = ({show, onClose}) => {
    const [showModal, setShowModal] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    const {tg, setTG} = useContext(MyContext);

    useEffect(() => {
        getMyFriends().then(res => setFriends(res));
    }, [show]);

    const handleCopyInviteLink = () => {
        const inviteLink = `https://t.me/crypto_plants_bot/plants?start=${tg.initDataUnsafe.user?.id}`;
        navigator.clipboard.writeText(inviteLink).then(r => r)
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span> {}
                <h2>My Fens</h2>

                <div className="player-list">
                    <div className="player-table">
                        <table>
                            <thead>
                            <tr>
                                <th className="name-column">Name</th>
                                <th className="coins-column">Coins</th>
                            </tr>
                            </thead>
                            <tbody>
                            {friends.map((participant, index) => (
                                <tr key={index}>
                                    <td className="name-column">{participant?.name}</td>
                                    <td className="coins-column">{participant?.coins}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="invite-button">
                    <div className="invite-link-preview">My invite link: https://t.me/crypto_plants_bot/plants?startapp={tg.initDataUnsafe.user?.id}</div>
                    <button onClick={handleCopyInviteLink}>
                        Get invite link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendsList;
