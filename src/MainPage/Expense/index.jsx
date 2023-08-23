import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import ExpenseCategory from './ExpenseCategory';

const PurchaseRoute = ({ match}) =>(
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/expenselist-expense`} />
        <Route path={`${match.url}/expenselist-expense`} component={ExpenseList} />
        <Route path={`${match.url}/addexpense-expense`} component={AddExpense} />
        <Route path={`${match.url}/editexpense-expense`} component={EditExpense} />
        <Route path={`${match.url}/expensecategory-expense`} component={ExpenseCategory} />
    </Switch>
)

export default PurchaseRoute;