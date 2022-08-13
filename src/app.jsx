import React from 'react'
import Users from './components/users'
import NavBar from './components/navBar'
import { Switch, Route } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'
import UserPage from './components/userPage'

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:userId?" component={UserPage} />
            </Switch>

        </>
    )
}

export default App
