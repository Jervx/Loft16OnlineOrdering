import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Insights from './Insights'
import Products from './Products'
import NotFound from '../NotFound'


const AdminContainer = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/admin/insights' component={Insights}/>
                <Route exact path='/admin/products' component={Products}/>
                <Route exact path='/admin/' component={Insights}/>
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    )
}

export default AdminContainer
