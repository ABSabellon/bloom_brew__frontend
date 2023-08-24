import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import InventoryReports from './PurchaseReports';
import SalesReports from './SalesReports';
import SupplierReports from './SupplierReports';







const ReportsIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/inventory-reports`} />
        <Route path={`${match.url}/inventory-reports`} component={InventoryReports} />                                                                                             
        <Route path={`${match.url}/sales-reports`} component={SalesReports} />                                                                                               
        <Route path={`${match.url}/supplier-reports`} component={SupplierReports} />                                                                                           
        
    </Switch>
)

export default ReportsIndex