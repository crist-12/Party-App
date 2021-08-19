import React, {useState} from 'react'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function RoomJoinPage(props) {

const [error, setError] = useState();
const [roomCode, setRoomCode] = useState();

const handleRoomCode = (e) =>{
    setRoomCode(e.target.value);
}

const handleRoomButtonPressed = () => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode
        })
    }
    fetch('join-room', requestOptions).then((response)=>{
        if(response.ok){
            props.history.push(`/room/${roomCode}`)
        }else{
            setError("Room no encontrado")
        }
    }).catch((error)=>{
        console.log(error);
    })
}

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Únete a un Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error = {error}
                    label = "Código"
                    placeholder = "Ingresa el código del room"
                    value = {roomCode}
                    helperText = {error}
                    variant =  "outlined"
                    onChange = {handleRoomCode}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={handleRoomButtonPressed}>Entrar al Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>Regresar</Button>
            </Grid>
        </Grid>
    );
}
