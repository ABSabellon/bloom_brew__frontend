import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSales from './ManageSales/ManageSales';
import ManageProducts from './ManageProducts/ManageProducts/ManageProducts';
import ManageCategory from './ManageProducts/ManageCategories/ManageCategory';
import ManageInventory from './ManageInventory/ManageInventory';
import ManageUsers from './ManagePeople/ManageUsers';
import ManageSuppliers from './ManagePeople/ManageSuppliers';







const ManageIndex = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/sales-manage`} />
        <Route path={`${match.url}/sales-manage`} component={ManageSales} />
        <Route path={`${match.url}/products-manage`} component={ManageProducts} />
        <Route path={`${match.url}/categories-manage`} component={ManageCategory} />
        <Route path={`${match.url}/inventory-manage`} component={ManageInventory} />
        <Route path={`${match.url}/users-manage`} component={ManageUsers} />
        <Route path={`${match.url}/suppliers-manage`} component={ManageSuppliers} />
    </Switch>
)

export default ManageIndex