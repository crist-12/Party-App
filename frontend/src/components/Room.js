import React, {useState} from 'react'

export default function Room(props) {

const [votesToSkip, setVotesToSkip] = useState(2);
const [guestCanPause, setGuestCanPause] = useState(false);
const [isHost, setIsHost] = useState(false);
const [roomCode, setRoomCode] = useState(props.match.params.roomCode)

const getRoomDetails = () => {
    fetch("/get-room" + "?code=" + roomCode)
    .then((response) => response.json())
    .then((data) => {
     setVotesToSkip(data.votes_to_skip);
     setGuestCanPause(data.guest_can_pause);
     setIsHost(data.is_host);
    });
}

    return (
        <div>
        <h3>{roomCode}</h3>
        <p>Votos: {votesToSkip}</p>
        <p>Invitados pueden pausar: {guestCanPause.toString()}</p>
        <p>Anfitrión: {isHost.toString()}</p>
      </div>
    )
}
