import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ChatApp from './ChatApp';
import CalendarApp from './CalendarApp';
import EmailApp from './EmailApp';

const Applications = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/tables-basic`} />
        <Route path={`${match.url}/chat-applications`} component={ChatApp} />                                           
        <Route path={`${match.url}/calendar-applications`} component={CalendarApp} />                                           
        <Route path={`${match.url}/email-applications`} component={EmailApp} />                                           
        
    </Switch>
)

export default Applications