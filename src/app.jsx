import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Users from './layouts/users'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
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
                <Redirect to="/" />
            </Switch>

        </>
    )
}

export default App
