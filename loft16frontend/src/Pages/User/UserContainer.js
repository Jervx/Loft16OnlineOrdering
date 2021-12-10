import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from '../../Components/Header'
import ProtectedRoute from '../../Components/ProtectedRoute'

const UserContainer = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/profile' render={(props) => <UserProfile />} />
            </Switch>
        </div>
    )
}

export default UserContainer
