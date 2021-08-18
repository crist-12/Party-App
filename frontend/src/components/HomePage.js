import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom' 
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'

//Las rutas también deben definirse en el archivo urls.py del frontend

export default function HomePage() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><p>Esta es la homepage</p></Route>
                <Route path="/join" component={RoomJoinPage}></Route>
                <Route path="/create" component={CreateRoomPage}></Route>
            </Switch>
        </Router>
    )
}

