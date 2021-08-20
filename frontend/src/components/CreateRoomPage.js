import React, { useState } from 'react'
import { Typography, Button, Grid, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Collapse } from '@material-ui/core';


CreateRoomPage.defaultProps = {
    votesToSkip : 2,
    guestcanPause : true,
    update : false,
    roomCode : null,
    updateCallback : () => {}    
}

export default function CreateRoomPage(props) {

const [defaultVotes, setDefaultVotes] = useState(2);
const [guestCanPause, setGuestCanPause] = useState(true);
const [votesToSkip, setVotesToSkip] = useState(2);
const [successMsg, setSuccessMsg] = useState("");
const [errorMsg, setErrorMsg] = useState("");

const handleCanSkip = (e) => {
    setGuestCanPause((e.target.value === "true"?true:false));
}

const handleVotes = (e) => {
    setVotesToSkip(e.target.value);
}

const handleRoomButtonPressed = () => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: votesToSkip,
          guest_can_pause:  guestCanPause
        }),
      };
      fetch("create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => props.history.push('/room/'+data.code));
}

const renderCreateButtons = () => {
    return(
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" onClick={handleRoomButtonPressed}>Crear un Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" to="/" component={Link}>Regresar</Button>
        </Grid>
    </Grid> 
    );
}

const renderUpdateButtons = () => {
  return(
    <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={handleUpdateButtonPressed}>Actualizar Room</Button>
    </Grid>
  );  
}

const handleUpdateButtonPressed = () => {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: votesToSkip,
          guest_can_pause:  guestCanPause,
          code: props.roomCode
        }),
      };
      fetch("update-room", requestOptions)
        .then((response) => {
            if(response.ok){
                setSuccessMsg("¡Room actualizado exitosamente!");
            }else{
                setErrorMsg("Ocurrió un error al actualizar room");
            }
        })
}

const title = props.update ? "Actualizar Room" : "Crear Room"

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMsg != "" || successMsg != ""}>
                    {successMsg}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>{title}</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Los invitados pueden controlar el ambiente
                        </div>
                        <RadioGroup row defaultValue="true" onChange={handleCanSkip}>
                            <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pausa" labelPlacement="bottom"/>
                            <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No tienen control" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number" defaultValue={votesToSkip} inputProps={{min:1, style:{textAlign: 'center'}}} onChange={handleVotes}/>
                    <FormHelperText>
                        <div align="center">
                            Votos requeridos para cambiar canción
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            { props.update ? renderUpdateButtons() : renderCreateButtons() }
        </Grid>
    )
}
