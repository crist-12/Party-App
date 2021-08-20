import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom' 
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'
import Room from './Room'
import { Grid, Button, Typography, ButtonGroup } from '@material-ui/core'
//Las rutas también deben definirse en el archivo urls.py del frontend

export default function HomePage() {

const [roomCode, setRoomCode] = useState(null);

 useEffect(() => {
    const getData= async()=> {
        fetch('user-in-room')
        .then((response)=> response.json())
        .then((data)=>{
            setRoomCode(data.code);
        });
    };

    getData();
}, []) 

const clearRoomCode = () => {
    setRoomCode(null);
}

const renderHomePage = () => {
    return(
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    HouseParty
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>Unirse a un room</Button>
                    <Button color="secondary" to="/create" component={Link}>Crear un room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}


    return (
        <Router>
            <Switch>
                <Route exact path="/" render={
                    ()=>{
                        return roomCode ? (<Redirect to={`/room/${roomCode}`}/>) : 
                        (renderHomePage())
                    }
                }/>
                <Route path="/join" component={RoomJoinPage}></Route>
                <Route path="/create" component={CreateRoomPage}></Route>
                <Route path="/room/:roomCode"
                render = {(props) => {
                    return <Room {...props} leaveRoomCallback={clearRoomCode}/>;
                }}
                />
            </Switch>
        </Router>
    )
}

