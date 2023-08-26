import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import GeneralSettings from './GeneralSettings';
import UserPermissions from './UserPermissions';
import EmailSettings from './EmailSettings';







const SettingsIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/general`} />
        <Route path={`${match.url}/general-settings`} component={GeneralSettings} />       
        <Route path={`${match.url}/user-permissions`} component={UserPermissions} />     
        <Route path={`${match.url}/email-settings`} component={EmailSettings} />                                                                                                                                                                                      
        
    </Switch>
)

export default SettingsIndex