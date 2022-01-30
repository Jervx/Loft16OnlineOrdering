import React, { useEffect } from 'react'
import {Switch, Route} from 'react-router-dom'

import Insights from './Insights'
import Products from './Products'
import NotFound from '../NotFound'

import AdminHeader from '../../Components/AdminHeader'

import { openInputModal } from '../../Features/uiSlice'
import { useDispatch, useSelector } from 'react-redux'

const AdminContainer = () => {

    const dispatch = useDispatch()
    const adminData = useSelector((state)=> state.adminData)

    useEffect((state)=>{
       
    })

    return (
        <div>
            <AdminHeader />
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
