import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
// import Pos from './Pos';
import Pos from './Pos'







const PosIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/point-of-sale`} />
        <Route path={`${match.url}/point-of-sale`} component={Pos} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    </Switch>
)

export default PosIndex