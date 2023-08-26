import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import MenuList from './MenuList';







const MenuIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/generalsettings`} />
        <Route path={`${match.url}/menu-list`} component={MenuList} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    </Switch>
)

export default MenuIndex