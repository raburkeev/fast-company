import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import EditUserPage from './components/page/editUserPage'

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" exact component={Users} />
                <Route path="/users/:userId/edit" component={EditUserPage} />
                <Redirect to="/" />
            </Switch>

        </>
    )
}

export default App
