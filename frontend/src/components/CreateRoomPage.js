import React, { useState } from 'react'
import { Typography, Button, Grid, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { Link } from 'react-router-dom'

export default function CreateRoomPage() {

const [defaultVotes, setDefaultVotes] = useState(2);
const [canPause, setCanPause] = useState(true);
const [votesToSkip, setVotesToSkip] = useState(2);

const handleCanSkip = (e) => {
    setCanPause((e.target.value === "true"?true:false));
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
          guest_can_pause:  canPause
        }),
      };
      fetch("create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
}

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>Crear un Room</Typography>
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
                    <TextField required={true} type="number" defaultValue={defaultVotes} inputProps={{min:1, style:{textAlign: 'center'}}} onChange={handleVotes}/>
                    <FormHelperText>
                        <div align="center">
                            Votos requeridos para cambiar canción
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={handleRoomButtonPressed}>Crear un Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="/" component={Link}>Regresar</Button>
            </Grid>
        </Grid>
    )
}
