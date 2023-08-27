import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import InventoryReports from './PurchaseReports';
import SalesReports from './SalesReports';
import SupplierReports from './SupplierReports';







const ReportsIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/reports-inventory`} />
        <Route path={`${match.url}/reports-inventory`} component={InventoryReports} />                                                                                             
        <Route path={`${match.url}/reports-sales`} component={SalesReports} />                                                                                               
        <Route path={`${match.url}/reports-supplier`} component={SupplierReports} />                                                                                           
        
    </Switch>
)

export default ReportsIndex