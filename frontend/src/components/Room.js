import React, {useState, useEffect} from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';

export default function Room(props) {

const [votesToSkip, setVotesToSkip] = useState(2);
const [guestCanPause, setGuestCanPause] = useState(false);
const [isHost, setIsHost] = useState(false);
const [roomCode, setRoomCode] = useState(props.match.params.roomCode)
const [showSetting, setShowSettings] = useState(false)

useEffect(()=>{
    getRoomDetails();
}
,[])


const getRoomDetails = () => {
    return fetch("/get-room" + "?code=" + roomCode)
    .then((response) => {
       if(!response.ok){
            props.leaveRoomCallback();
            props.history.push('/');
        }
        return response.json();
    })
    .then((data) => {
     setVotesToSkip(data.votes_to_skip);
     setGuestCanPause(data.guest_can_pause);
     setIsHost(data.is_host);
    });
}

const leaveButtonPressed = () => {
    const requestOptions = {
        method : 'POST',
        headers: { 'Content-Type': 'application/json'},
    };

    fetch('/leave-room', requestOptions)
    .then((_response)=>{
        props.leaveRoomCallback();
        props.history.push('/');
    })
}

const updateShowSettings = (value) => {
    setShowSettings(value);
}

const renderSettingsButton = () => {
    return(
        <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={()=> updateShowSettings(true)}>Configuraciones</Button>
        </Grid>
    );
}

const renderSettings = () => {
    return(
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <CreateRoomPage
                update={true} 
                votesToSkip={votesToSkip} 
                guestCanPause={guestCanPause} 
                roomCode={roomCode}
                updateCallback={()=>{}}
            />
        </Grid>
        <Grid item xs={12} align="center">
            <Button 
            variant="contained"
            color="primary"
            onClick={()=>updateShowSettings(false)}>
            Cerrar
            </Button>
        </Grid>
    </Grid>
    );
}

    return (
        showSetting?renderSettings():
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Código: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votos: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Invitados pueden pausar: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Anfitrión: {isHost.toString()}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>Abandonar Room</Button>
            </Grid>
        </Grid>
    )
}


{/* <div>
<h3>{roomCode}</h3>
<p>Votos: {votesToSkip}</p>
<p>Invitados pueden pausar: {guestCanPause.toString()}</p>
<p>Anfitrión: {isHost.toString()}</p>
</div> */}
