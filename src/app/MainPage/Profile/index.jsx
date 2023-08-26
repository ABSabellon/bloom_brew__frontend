import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';

const ProfileIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/user-profile`} />
        <Route path={`${match.url}/user-profile`} component={UserProfile} />
    </Switch>
)

export default ProfileIndex