/* Dependencies */
import { Route, Switch } from 'react-router-dom'

/* Protected */
import ProtectedRoute from '../../Components/ProtectedRoute'

/* Components */
import Header from "../../Components/Header"
import Products from "./Products"
import Home from "./Home"
import UserProfile from "../User/AccountProfile"

import MyCart from '../Public/MyCart'
import NotFound from '../NotFound'



const PublicContainer = ({toAuth}) => {
    console.log("PUBLIC")
    return (
        <div>
                <Header />
                <Switch>
                    <Route exact path='/products' render={(props) => <Products />} />
                    <Route exact path='/profile' render={(props) => <UserProfile />} />
                    <ProtectedRoute exact path='/mycart' component={MyCart} />
                    <Route exact path='/' render={(props) => <Home />} />
                    <Route path="*" component={NotFound} />
                </Switch>
        </div>
    )
}

export default PublicContainer
